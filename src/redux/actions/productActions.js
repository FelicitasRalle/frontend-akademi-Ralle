import { type } from "@testing-library/user-event/dist/type";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (product) => ({
    type: SET_PRODUCTS,
    payload: product,
});

export const addProducts = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id,
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});