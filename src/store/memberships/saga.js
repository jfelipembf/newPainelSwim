import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_MEMBERSHIPS,
  CREATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
} from "./actionTypes";
import {
  fetchMembershipsSuccess,
  fetchMembershipsError,
  createMembershipSuccess,
  createMembershipError,
  updateMembershipSuccess,
  updateMembershipError,
  deleteMembershipSuccess,
  deleteMembershipError,
} from "./actions";
import { getMembershipsHelper } from "../../helpers/memberships_helper";

function* handleFetchMemberships() {
  try {
    const helper = getMembershipsHelper();
    const memberships = yield call([helper, helper.listMemberships]);
    yield put(fetchMembershipsSuccess(memberships));
  } catch (error) {
    yield put(fetchMembershipsError(error?.message || "Erro ao carregar planos"));
  }
}

function* handleCreateMembership({ payload }) {
  try {
    const helper = getMembershipsHelper();
    const created = yield call([helper, helper.createMembership], payload);
    yield put(createMembershipSuccess(created));
  } catch (error) {
    yield put(createMembershipError(error?.message || "Erro ao criar plano"));
  }
}

function* handleUpdateMembership({ payload }) {
  try {
    const helper = getMembershipsHelper();
    const { id, updates } = payload;
    const updated = yield call([helper, helper.updateMembership], id, updates);
    yield put(updateMembershipSuccess(updated));
  } catch (error) {
    yield put(updateMembershipError(error?.message || "Erro ao atualizar plano"));
  }
}

function* handleDeleteMembership({ payload }) {
  try {
    const helper = getMembershipsHelper();
    yield call([helper, helper.deleteMembership], payload);
    yield put(deleteMembershipSuccess(payload));
  } catch (error) {
    yield put(deleteMembershipError(error?.message || "Erro ao excluir plano"));
  }
}

export default function* membershipsSaga() {
  yield all([
    takeLatest(FETCH_MEMBERSHIPS, handleFetchMemberships),
    takeLatest(CREATE_MEMBERSHIP, handleCreateMembership),
    takeLatest(UPDATE_MEMBERSHIP, handleUpdateMembership),
    takeLatest(DELETE_MEMBERSHIP, handleDeleteMembership),
  ]);
}
