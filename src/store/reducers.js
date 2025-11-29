import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

import Breadcrumb from "./Breadcrumb/reducer";

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
//chat
import chat from "./chat/reducer";

//Calendar
import calendar from "./calendar/reducer"

//tasks
import tasks from "./tasks/reducer";
import employees from "./employees/reducer";
import members from "./members/reducer";
import memberships from "./memberships/reducer";
import areas from "./areas/reducer";
import products from "./products/reducer";
import services from "./services/reducer";
import activities from "./activities/reducer";
import levels from "./levels/reducer";
import objectives from "./objectives/reducer";
import topics from "./topics/reducer";
import activitiesSchedule from "./activities_schedule/reducer";
import activitiesSessions from "./activities_sessions/reducer";
import activitiesEnrollments from "./activities_enrollments/reducer";
import activitiesAttendance from "./activities_attendance/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
   //Breadcrumb items
   Breadcrumb,
  tasks,
  Login,
  register: Account,  // Renomeando para 'register' para corresponder ao mapStateToProps
  ForgetPassword,
  Profile,
  calendar,
  chat,
  employees,
  members,
  memberships,
  areas,
  products,
  services,
  activities,
  levels,
  objectives,
  topics,
  activitiesSchedule,
  activitiesSessions,
  activitiesEnrollments,
  activitiesAttendance,
})

export default rootReducer
