export const state = () => ({
  products: [],
  version: "0.0.1",
});

export const mutations = {
  addProduct(state, product) {
    // if cart doesn't have product add it
    if (!state.products.find((p) => product.id === p.id)) {
      state.products = [...state.products, product];
    }
  },
  setProduct(state, { productId, data }) {
    state.products = [
      ...state.products.filter((prod) => prod.id !== productId),
      data,
    ];
  },
  removeProduct(state, productId) {
    state.products = Array.from(
      state.products.filter((prod) => prod.id !== productId)
    );
  },
};

export const actions = {
  addProduct({ commit }, data) {
    commit("addProduct", data);
  },
  removeProduct({ commit }, productId) {
    commit("removeProduct", productId);
  },
};
