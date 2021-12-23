// Libraries
import Vue from "vue";
import Vuex, { Store } from "vuex";
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

// Modules
import { state, getters, mutations, actions } from "~/store/index";

// Components
import HomePage from "~/pages/index.vue";

// Mock
import TattooSVG from "~/assets/svg/tattoo.svg";
import RoadJPG from "~/assets/img/decoration/road.jpg?data";

describe("HomePage - pages/index.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let store;

  beforeEach(() => {
    Vue.use(Vuetify);
    vuetify = new Vuetify();
    localVue.use(Vuex);
    store = new Store({
      state,
      getters,
      mutations,
      actions,
    });
  });
  //
  it("name", () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.vm.$options.name).toBe("HomePage");
  });
  //
  it("components", () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      vuetify,
      store,
    });
    const keyList = Object.keys(wrapper.vm.$options.components);
    expect(keyList.includes("CountryList")).toBe(true);
    expect(keyList.includes("CategoriesMotorTransport")).toBe(true);
    expect(keyList.includes("ContactForm")).toBe(true);
  });
  //
  it("data", () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.vm.RoadJPG).toEqual(RoadJPG);
    expect(wrapper.vm.TattooSVG).toEqual(TattooSVG);
  });
});
