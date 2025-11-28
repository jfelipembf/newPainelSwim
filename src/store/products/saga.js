import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./actionTypes";
import {
  fetchProductsSuccess,
  fetchProductsError,
  createProductSuccess,
  createProductError,
  updateProductSuccess,
  updateProductError,
  deleteProductSuccess,
  deleteProductError,
} from "./actions";
import { getProductsHelper } from "../../helpers/products_helper";

function* fetchProductsSaga() {
  try {
    const helper = getProductsHelper();
    const items = yield call([helper, helper.listProducts]);
    yield put(fetchProductsSuccess(items));
  } catch (error) {
    yield put(fetchProductsError(error.message || "Erro ao buscar produtos"));
  }
}

function* createProductSaga({ payload }) {
  try {
    const helper = getProductsHelper();
    const created = yield call([helper, helper.createProduct], payload);
    yield put(createProductSuccess(created));
  } catch (error) {
    yield put(createProductError(error.message || "Erro ao criar produto"));
  }
}

function* updateProductSaga({ payload }) {
  try {
    const helper = getProductsHelper();
    const updated = yield call([helper, helper.updateProduct], payload.id, payload.updates);
    yield put(updateProductSuccess(updated));
  } catch (error) {
    yield put(updateProductError(error.message || "Erro ao atualizar produto"));
  }
}

function* deleteProductSaga({ payload }) {
  try {
    const helper = getProductsHelper();
    yield call([helper, helper.deleteProduct], payload);
    yield put(deleteProductSuccess(payload));
  } catch (error) {
    yield put(deleteProductError(error.message || "Erro ao excluir produto"));
  }
}

export default function* productsSaga() {
  yield all([
    takeEvery(FETCH_PRODUCTS, fetchProductsSaga),
    takeEvery(CREATE_PRODUCT, createProductSaga),
    takeEvery(UPDATE_PRODUCT, updateProductSaga),
    takeEvery(DELETE_PRODUCT, deleteProductSaga),
  ]);
}
