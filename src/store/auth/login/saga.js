import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Firebase Helper
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { getAuditHelper } from "../../../helpers/audit_helper"
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../../../constants/audit";
import { getEmployeesHelper } from "../../../helpers/employees_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(
      fireBaseBackend.loginUser,
      user.email,
      user.password
    );

    // Log audit activity
    const auditHelper = getAuditHelper();
    yield call([auditHelper, auditHelper.logActivity], {
      userId: response.uid,
      userEmail: response.email,
      userName: response.displayName || response.email,
      userRole: 'employee', // TODO: Get from user data
      action: AUDIT_ACTIONS.LOGIN_EMPLOYEE,
      resource: AUDIT_RESOURCES.SYSTEM,
      resourceId: response.uid,
      details: {
        loginMethod: 'email_password',
        loginTime: new Date().toISOString()
      }
    });

    yield put(loginSuccess(response));
    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    // Get current user before logout for audit logging
    const currentUser = fireBaseBackend.getAuthenticatedUser();

    const response = yield call(fireBaseBackend.logout);

    // Log audit activity
    if (currentUser) {
      const auditHelper = getAuditHelper();
      yield call([auditHelper, auditHelper.logActivity], {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email,
        userRole: 'employee', // TODO: Get from user data
        action: AUDIT_ACTIONS.LOGOUT_EMPLOYEE,
        resource: AUDIT_RESOURCES.SYSTEM,
        resourceId: currentUser.uid,
        details: {
          logoutTime: new Date().toISOString()
        }
      });
    }

    yield put(logoutUserSuccess(response));
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    const response = yield call(fireBaseBackend.socialLoginUser, type);

    // Garantir que existe um documento básico no employees
    try {
      const employeesHelper = getEmployeesHelper();
      yield call([employeesHelper, employeesHelper.addNewUserFromSocial], response);
    } catch (err) {
      console.warn("Falha ao criar documento de colaborador pós social login:", err);
    }

    localStorage.setItem("authUser", JSON.stringify(response));
    yield put(loginSuccess(response));
    history("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
