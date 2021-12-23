<!--
---------------------
Home page of the site
---------------------
-->
<template>
  <div>
    <!-- -->
    <v-img
      :src="RoadJPG"
      max-height="560px"
      :aspect-ratio="16 / 9"
      class="white--text align-center"
    >
      <v-row class="px-4 d-flex justify-center">
        <v-col cols="12">
          <v-img
            class="white--text align-center"
            contain
            max-height="560px"
            :aspect-ratio="16 / 9"
            :src="TattooSVG"
          >
            <div class="pl-4">
              <h1
                class="text-center text-xs-h3 text-sm-h3 text-md-h1 font-weight-black text-uppercase site-name orange--text text--darken-4"
              >
                {{ siteName }}
              </h1>
              <h2
                class="text-center text-body-1 text-sm-subtitle-1 text-md-h5 font-weight-bold site-description blue-grey--text text--lighten-4"
              >
                {{
                  metaTitle.slice(-1) === "."
                    ? metaTitle.slice(0, -1)
                    : metaTitle
                }}
              </h2>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-img>

    <!-- -->
    <CategoriesMotorTransport :categories="typeTransportList" />

    <!-- -->
    <CountryList :countries="countryList" />

    <!-- -->
    <v-parallax src="/road.jpg" class="mt-12"></v-parallax>

    <!-- -->
    <ContactForm />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TattooSVG from "~/assets/svg/tattoo.svg";
import RoadJPG from "~/assets/img/decoration/road.jpg?data";
import CountryList from "~/components/categories/CountryList.vue";
import CategoriesMotorTransport from "~/components/categories/CategoriesMotorTransport.vue";
import ContactForm from "~/components/forms/ContactForm.vue";

export default {
  name: "HomePage",

  components: {
    CountryList,
    CategoriesMotorTransport,
    ContactForm,
  },

  async asyncData({ store, $axios, error }) {
    try {
      const [typeTransportList, countryList] = await Promise.all([
        $axios.$get("/mock/type_transport_list.json"),
        $axios.$get("/mock/country_list.json"),
      ]);
      store.dispatch("getHomePageData", {
        typeTransportList,
        countryList,
      });
    } catch (err) {
      console.log(err);
      return error({
        statusCode: 404,
        message: "Категории не найдены или сервер не доступен",
      });
    }
  },

  data() {
    return {
      RoadJPG,
      TattooSVG,
    };
  },

  head() {
    const baseTitle = this.metaTitle;
    return {
      title: this.siteName,
      titleTemplate(title) {
        return `${title}: ${baseTitle}`; // max 60 characters
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.siteName}: ${this.metaDescription}`, // max 300 characters
        },
      ],
    };
  },

  computed: {
    ...mapState({
      siteName: "siteName",
      metaTitle: "metaTitle",
      metaDescription: "metaDescription",
      countryList: "countryList",
      typeTransportList: "typeTransportList",
    }),
  },
};
</script>

<style scoped>
.site-name {
  letter-spacing: 8px !important;
}
.site-description {
  letter-spacing: 3px !important;
}
</style>
