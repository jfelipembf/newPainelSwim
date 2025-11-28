import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from "./actionTypes";

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const fetchProductsSuccess = (items) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: items });
export const fetchProductsError = (error) => ({ type: FETCH_PRODUCTS_ERROR, payload: error });

export const createProduct = (payload) => ({ type: CREATE_PRODUCT, payload });
export const createProductSuccess = (item) => ({ type: CREATE_PRODUCT_SUCCESS, payload: item });
export const createProductError = (error) => ({ type: CREATE_PRODUCT_ERROR, payload: error });

export const updateProduct = (id, updates) => ({ type: UPDATE_PRODUCT, payload: { id, updates } });
export const updateProductSuccess = (item) => ({ type: UPDATE_PRODUCT_SUCCESS, payload: item });
export const updateProductError = (error) => ({ type: UPDATE_PRODUCT_ERROR, payload: error });

export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, payload: id });
export const deleteProductSuccess = (id) => ({ type: DELETE_PRODUCT_SUCCESS, payload: id });
export const deleteProductError = (error) => ({ type: DELETE_PRODUCT_ERROR, payload: error });
