<!--
---------------------------------------
Display list of motorcycles by category
---------------------------------------
-->
<template>
  <v-container fluid class="mb-8">
    <BreadCrumbs />
    <BikeList :bikes="bikes" :type="metaTitle" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import BreadCrumbs from "~/components/commons/BreadCrumbs.vue";
import BikeList from "~/components/commons/BikeList.vue";

export default {
  name: "CategoriesPage",

  components: {
    BikeList,
    BreadCrumbs,
  },

  async asyncData({ store, route, $axios, error }) {
    try {
      const slug = route.params.category;
      const [typeTransportList, countryList, bikeList] = await Promise.all([
        $axios.$get("/mock/type_transport_list.json"),
        $axios.$get("/mock/country_list.json"),
        $axios.$get("/mock/bike_list.json"),
      ]);
      await store.dispatch("getCategoryPageData", {
        typeTransportList,
        countryList,
        bikeList,
        slug,
      });
    } catch (err) {
      console.log(err);
      return error({
        statusCode: 404,
        message: "Категории не найдены или сервер не доступен",
      });
    }
  },

  head() {
    const baseTitle = this.siteName;
    return {
      title: this.metaTitle,
      titleTemplate(title) {
        return `${title} | ${baseTitle}`; // max 60 characters
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription, // max 300 characters
        },
      ],
    };
  },

  computed: {
    ...mapState({
      siteName: "siteName",
      metaTitle: "metaTitle",
      metaDescription: "metaDescription",
      bikes: "bikeList",
      typeTransportList: "typeTransportList",
      countryList: "countryList",
    }),
  },
};
</script>
