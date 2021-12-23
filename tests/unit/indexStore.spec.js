// Libraries
import Vuex, { Store } from "vuex";

// Utilities
import { createLocalVue } from "@vue/test-utils";

// Modules
import { state, getters, mutations, actions } from "~/store/index";

// Mock
import typeTransportList from "~/static/mock/type_transport_list";
import countryList from "~/static/mock/country_list";
import bikeList from "~/static/mock/bike_list";

describe("store.index", () => {
  const localVue = createLocalVue();
  let store;

  beforeEach(() => {
    localVue.use(Vuex);
    store = new Store({
      state,
      getters,
      mutations,
      actions,
    });
  });

  // State
  // -----------------------------------------------------------------------------------------------
  it("state.siteName", () => {
    expect(store.state.siteName).toBe("Motorama");
  });
  //
  it("state.metaTitle", () => {
    expect(store.state.metaTitle).toBe("");
  });
  //
  it("state.metaDescription", () => {
    expect(store.state.metaDescription).toBe("");
  });
  //
  it("state.typeTransportList", () => {
    expect(store.state.typeTransportList).toEqual([]);
  });
  //
  it("state.countryList", () => {
    expect(store.state.countryList).toEqual([]);
  });
  //
  it("state.bikeList", () => {
    expect(store.state.bikeList).toEqual([]);
  });
  //
  it("state.currentProduct", () => {
    expect(store.state.currentProduct).toEqual({});
  });

  // Mutations
  // -----------------------------------------------------------------------------------------------
  it("mutations.setSiteName", () => {
    const text = "Some text";
    store.commit("setSiteName", text);
    expect(store.state.siteName).toBe(text);
  });
  //
  it("mutations.setMetaTitle", () => {
    const text = "Some text";
    store.commit("setMetaTitle", text);
    expect(store.state.metaTitle).toBe(text);
  });
  //
  it("mutations.setMetaDescription", () => {
    const text = "Some text";
    store.commit("setMetaDescription", text);
    expect(store.state.metaDescription).toBe(text);
  });
  //
  it("mutations.setTypeTransportList", () => {
    const arr = typeTransportList;
    store.commit("setTypeTransportList", arr);
    expect(store.state.typeTransportList).toEqual(arr);
  });
  //
  it("mutations.setCountryList", () => {
    const arr = countryList;
    store.commit("setCountryList", arr);
    expect(store.state.countryList).toEqual(arr);
  });
  //
  it("mutations.setBikeList", () => {
    const arr = bikeList;
    store.commit("setBikeList", arr);
    expect(store.state.bikeList).toEqual(arr);
  });
  //
  it("mutations.setCurrentProduct", () => {
    const obj = bikeList[0];
    store.commit("setCurrentProduct", obj);
    expect(store.state.currentProduct).toEqual(obj);
  });

  // Actions
  // -----------------------------------------------------------------------------------------------
  it("actions.getHomePageData", async () => {
    await store.dispatch("getHomePageData", { typeTransportList, countryList });
    expect(store.state.metaTitle).toBe(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    );
    expect(store.state.metaDescription).toBe(
      "Donec ultrices neque ut purus semper varius."
    );
    expect(store.state.typeTransportList).toEqual(typeTransportList);
    expect(store.state.countryList).toEqual(countryList);
  });
  //
  it("actions.getCategoryPageData", async () => {
    const slug = "atvs";
    const bikes = bikeList.filter(
      (item) => item.type === slug || item.country === slug
    );
    await store.dispatch("getCategoryPageData", {
      typeTransportList,
      countryList,
      bikeList,
      slug,
    });
    expect(store.state.metaTitle).toBe("ATVs");
    expect(store.state.metaDescription).toBe(
      "Donec ultrices neque ut purus semper varius."
    );
    expect(store.state.typeTransportList).toEqual(typeTransportList);
    expect(store.state.countryList).toEqual(countryList);
    expect(store.state.bikeList).toEqual(bikes);
  });
  //
  it("actions.getProducPageData", async () => {
    const slug = "motorbike-1";
    const bike = bikeList.find((item) => item.slug === slug);
    await store.dispatch("getProducPageData", {
      typeTransportList,
      countryList,
      bikeList,
      slug,
    });
    expect(store.state.metaTitle).toBe("Motorbike 1");
    expect(store.state.metaDescription).toBe(
      "cillum labore culpa laboris aliqua consequat duis amet proident proident"
    );
    expect(store.state.typeTransportList).toEqual(typeTransportList);
    expect(store.state.countryList).toEqual(countryList);
    expect(store.state.currentProduct).toEqual(bike);
  });
});
