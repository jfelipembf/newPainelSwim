import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga";
import tasksSaga from "./tasks/saga"
import employeesSaga from "./employees/saga";
import membersSaga from "./members/saga";
import membershipsSaga from "./memberships/saga";
import areasSaga from "./areas/saga";
import productsSaga from "./products/saga";
import servicesSaga from "./services/saga";
import activitiesSaga from "./activities/saga";
import levelsSaga from "./levels/saga";
import objectivesSaga from "./objectives/saga";
import topicsSaga from "./topics/saga";


export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    fork(calendarSaga),
    fork(chatSaga),
    fork(tasksSaga),
    fork(employeesSaga),
    fork(membersSaga),
    fork(membershipsSaga),
    fork(areasSaga),
    fork(productsSaga),
    fork(servicesSaga),
    fork(activitiesSaga),
    fork(levelsSaga),
    fork(objectivesSaga),
    fork(topicsSaga),
  ])
}
