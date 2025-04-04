const initialState = {
  products: []
};

export const setProducts = (products) => ({
  type: "SET_PRODUCTS",
  payload: products
});

export const addProduct = (product) => ({
  type: "ADD_PRODUCT",
  payload: product
});

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};

