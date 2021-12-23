<!--
---------------------------------------------
Displaying information about a single product
---------------------------------------------
-->
<template>
  <v-container fluid class="mb-8">
    <BreadCrumbs />
    <v-img
      contain
      :src="MountainsSVG"
      :aspect-ratio="16 / 9"
      :max-height="400"
    />
    <h3
      class="text-center text-h5 text-md-h4 mt-2 mb-8 mt-md-8 mb-md-16 blue-grey--text text--lighten-4"
    >
      {{ product.title }}
    </h3>
    <v-row class="px-4 d-flex justify-center">
      <v-col cols="auto">
        <v-img
          contain
          :src="product.img"
          :aspect-ratio="1"
          :width="400"
          :height="400"
          class="blue-grey lighten-5"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="12" :md="6">
        <v-simple-table>
          <template #default>
            <tbody>
              <tr v-for="(value, name) in product" :key="`property-${name}`">
                <td>{{ name }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="mt-10 px-4" align="center" justify="center">
      <v-col cols="auto">
        <BuyButton :product="product" />
      </v-col>
    </v-row>
    <v-img
      contain
      :src="TireTrackSVG"
      :aspect-ratio="16 / 9"
      :max-height="400"
      class="mt-16"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import BuyButton from "~/components/commons/BuyButton.vue";
import BreadCrumbs from "~/components/commons/BreadCrumbs.vue";
import MountainsSVG from "~/assets/svg/mountains.svg";
import TireTrackSVG from "~/assets/svg/tire_track.svg";

export default {
  name: "ProductPage",

  components: {
    BreadCrumbs,
    BuyButton,
  },

  async asyncData({ store, route, $axios, error }) {
    try {
      const slug = route.params.product;
      const [typeTransportList, countryList, bikeList] = await Promise.all([
        $axios.$get("/mock/type_transport_list.json"),
        $axios.$get("/mock/country_list.json"),
        $axios.$get("/mock/bike_list.json"),
      ]);
      store.dispatch("getProducPageData", {
        typeTransportList,
        countryList,
        bikeList,
        slug,
      });
    } catch (err) {
      console.log(err);
      return error({
        statusCode: 404,
        message: "Товар не найдены или сервер не доступен",
      });
    }
  },

  data() {
    return {
      MountainsSVG,
      TireTrackSVG,
    };
  },

  head() {
    const baseTitle = this.siteName;
    return {
      title: this.product.title,
      titleTemplate(title) {
        return `${title} | ${baseTitle}`; // max 60 characters
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.product.description, // max 300 characters
        },
      ],
    };
  },

  computed: {
    ...mapState({
      siteName: "siteName",
      product: "currentProduct",
    }),
  },
};
</script>
