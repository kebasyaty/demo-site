<!--
-------------------------------
Breadcrumbs for site navigation
-------------------------------
-->
<template>
  <v-breadcrumbs large :items="crumbs">
    <template #item="{ item }">
      <v-breadcrumbs-item
        nuxt
        :to="item.to"
        :disabled="item.disabled"
        :active-class="item.activeClass"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BreadCrumbs",

  computed: {
    ...mapState({
      typeTransportList: "typeTransportList",
      countryList: "countryList",
      currentProduct: "currentProduct",
    }),
    //
    crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const paramsAdaptiveLen = params.length - 1;
      const crumbs = [
        {
          text: "Home Page",
          disabled: false,
          to: "/",
        },
      ];
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);
        if (match.name) {
          crumbs.push({
            text: this.getPageName(match.name, param),
            disabled: false,
            to: path,
            activeClass:
              index < paramsAdaptiveLen ? "" : "v-breadcrumbs__item--disabled",
          });
        }
      });
      return crumbs;
    },
  },

  methods: {
    getPageName(name, param) {
      switch (name) {
        case "category":
          if (
            this.countryList.filter((item) => item.slug === param).length > 0
          ) {
            return this.countryList.filter((item) => item.slug === param)[0]
              .title;
          }
          return this.typeTransportList.filter((item) => item.slug === param)[0]
            .title;
        case "category-product":
          return this.currentProduct.title;
        default:
          return "???";
      }
    },
  },
};
</script>
