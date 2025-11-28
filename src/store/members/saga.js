import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_MEMBERS,
  CREATE_MEMBER,
} from "./actionTypes";
import {
  fetchMembersSuccess,
  fetchMembersError,
  createMemberSuccess,
  createMemberError,
} from "./actions";
import { getMembersHelper } from "../../helpers/members_helper";

function* handleFetchMembers() {
  try {
    const helper = getMembersHelper();
    const members = yield call([helper, helper.listMembers]);
    yield put(fetchMembersSuccess(members));
  } catch (error) {
    yield put(fetchMembersError(error?.message || "Erro ao carregar membros"));
  }
}

function* handleCreateMember({ payload }) {
  try {
    const helper = getMembersHelper();
    const created = yield call([helper, helper.createMember], payload);
    yield put(createMemberSuccess(created));
  } catch (error) {
    yield put(createMemberError(error?.message || "Erro ao criar membro"));
  }
}

export default function* membersSaga() {
  yield all([
    takeLatest(FETCH_MEMBERS, handleFetchMembers),
    takeLatest(CREATE_MEMBER, handleCreateMember),
  ]);
}
