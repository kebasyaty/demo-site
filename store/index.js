import hasTypeError from "~/utils/has_type_error.js";
const isDev = process.env.NODE_ENV === "development";

export const state = () => ({
  // Brand name
  siteName: "Motorama",
  // For meta tags
  metaTitle: String(),
  metaDescription: String(),
  // Categories of motor transport
  typeTransportList: [],
  // List of countries of manufacturers of motorbikes
  countryList: [],
  // Display list of motorcycles by category
  bikeList: [],
  currentProduct: {},
});

export const getters = {
  //
};

export const mutations = {
  setSiteName(state, text) {
    if (isDev && hasTypeError(text, "string")) return;
    state.siteName = text;
  },
  //
  setMetaTitle(state, text) {
    if (isDev && hasTypeError(text, "string")) return;
    state.metaTitle = text;
  },
  //
  setMetaDescription(state, text) {
    if (isDev && hasTypeError(text, "string")) return;
    state.metaDescription = text;
  },
  //
  setTypeTransportList(state, arr) {
    if (isDev && hasTypeError(arr, "array")) return;
    state.typeTransportList = arr;
  },
  //
  setCountryList(state, arr) {
    if (isDev && hasTypeError(arr, "array")) return;
    state.countryList = arr;
  },
  //
  setBikeList(state, arr) {
    if (isDev && hasTypeError(arr, "array")) return;
    state.bikeList = arr;
  },
  //
  setCurrentProduct(state, obj) {
    if (isDev && hasTypeError(obj, "object")) return;
    state.currentProduct = obj;
  },
};

export const actions = {
  getHomePageData({ commit }, { typeTransportList, countryList }) {
    const metaTitle =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const metaDescription = "Donec ultrices neque ut purus semper varius.";
    commit("setMetaTitle", metaTitle);
    commit("setMetaDescription", metaDescription);
    commit("setTypeTransportList", typeTransportList);
    commit("setCountryList", countryList);
  },
  //
  getCategoryPageData(
    { commit },
    { typeTransportList, countryList, bikeList, slug }
  ) {
    const typeTransport = typeTransportList.find((item) => item.slug === slug);
    const country = countryList.find((item) => item.slug === slug);
    const bikes = bikeList.filter(
      (item) => item.type === slug || item.country === slug
    );
    const metadata = typeTransport || country;
    commit("setMetaTitle", metadata.title);
    commit("setMetaDescription", metadata.description);
    commit("setBikeList", bikes);
    commit("setTypeTransportList", typeTransportList);
    commit("setCountryList", countryList);
  },
  //
  getProducPageData(
    { commit },
    { typeTransportList, countryList, bikeList, slug }
  ) {
    const bike = bikeList.find((item) => item.slug === slug);
    const metaTitle = bike.title;
    const metaDescription = bike.description;
    commit("setMetaTitle", metaTitle);
    commit("setMetaDescription", metaDescription);
    commit("setCurrentProduct", bike);
    commit("setTypeTransportList", typeTransportList);
    commit("setCountryList", countryList);
  },
};
