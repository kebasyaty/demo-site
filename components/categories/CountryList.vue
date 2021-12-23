<!--
------------------------------------------------
List of countries of manufacturers of motorbikes
------------------------------------------------
-->
<template>
  <v-container fluid>
    <h3
      class="text-center text-h5 text-md-h4 mt-10 mb-2 mt-md-16 mb-md-10 blue-grey--text text--lighten-4"
    >
      {{ title }}
    </h3>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-card flat tile :width="1600" color="rgba(0, 0, 0, 0)" class="mt-6">
          <v-row>
            <v-col
              v-for="country in countries"
              :key="country.title"
              class="d-flex child-flex"
              cols="12"
              sm="6"
              md="3"
            >
              <v-hover v-slot="{ hover }" open-delay="100" close-delay="100">
                <v-lazy
                  :options="{
                    threshold: 0.5,
                  }"
                  min-height="100"
                  transition="fab-transition"
                >
                  <v-card
                    nuxt
                    :to="`/${country.slug}`"
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img
                      :src="country.img"
                      :aspect-ratio="16 / 9"
                      class="grey lighten-2"
                    >
                      <template #placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <h4
                      class="pa-4 text-center blue-grey--text text--lighten-4"
                    >
                      {{ country.title }}
                    </h4>
                  </v-card>
                </v-lazy>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CountryList",

  props: {
    countries: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      title: "Motorbikes producing countries",
    };
  },
};
</script>
