import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Firebase Helper
import { getAuditHelper } from "../../../helpers/audit_helper"
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../../../constants/audit"
import { getStorageHelper } from "../../../helpers/storage_helper";
import { getEmployeesHelper } from "../../../helpers/employees_helper";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload }) {
  try {
    const employeeData = payload.employeeData || payload.user || {};
    const photoFile = payload.photoFile || null;

    const employeesHelper = getEmployeesHelper();

    let response = yield call(
      [employeesHelper, employeesHelper.createEmployee],
      employeeData
    );

    // Upload foto após criar usuário para vincular ao uid
    if (photoFile) {
      try {
        const storageHelper = getStorageHelper();
        const storagePath = `employees/${response.user.uid}/photo_${Date.now()}_${photoFile.name}`;
        const uploadResult = yield call([storageHelper, storageHelper.uploadPhoto], photoFile, storagePath);

        // Atualiza o documento do colaborador com a URL da foto
        const docRef = firebase.firestore().collection("employees").doc(response.user.uid);
        yield call([docRef, docRef.update], { photoUrl: uploadResult.url });

        response = {
          ...response,
          employeeData: {
            ...response.employeeData,
            photoUrl: uploadResult.url
          }
        };
      } catch (uploadError) {
        console.error("Erro ao fazer upload da foto do colaborador:", uploadError);
        // Não falhar o cadastro por causa da foto; prossegue sem foto
      }
    }

    // Log audit activity
    const auditHelper = getAuditHelper();
    yield call([auditHelper, auditHelper.logActivity], {
      userId: response.user.uid, // The newly created employee
      userEmail: employeeData.email,
      userName: `${employeeData.name} ${employeeData.lastName || ''}`.trim(),
      userRole: 'employee',
      action: AUDIT_ACTIONS.CREATE_EMPLOYEE,
      resource: AUDIT_RESOURCES.EMPLOYEES,
      resourceId: response.user.uid,
      details: {
        employeeData,
        createdAt: new Date().toISOString()
      }
    })

    yield put(registerUserSuccessful(response))
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
