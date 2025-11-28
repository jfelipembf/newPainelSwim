import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_EMPLOYEES,
} from "./actionTypes";
import {
  fetchEmployeesSuccess,
  fetchEmployeesError,
} from "./actions";
import { getEmployeesHelper } from "../../helpers/employees_helper";

function* handleFetchEmployees() {
  try {
    const helper = getEmployeesHelper();
    const employees = yield call([helper, helper.listEmployees]);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error) {
    yield put(fetchEmployeesError(error?.message || "Erro ao carregar colaboradores"));
  }
}

export default function* employeesSaga() {
  yield takeLatest(FETCH_EMPLOYEES, handleFetchEmployees);
}
