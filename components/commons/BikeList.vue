<!--
---------------------------------------
Display list of motorcycles by category
---------------------------------------
-->
<template>
  <v-container fluid>
    <h3
      class="text-center text-h5 text-md-h4 mt-2 mb-2 mt-md-8 mb-md-10 blue-grey--text text--lighten-4"
    >
      {{ type }}
    </h3>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-card flat tile :width="1600" color="rgba(0, 0, 0, 0)" class="mt-6">
          <v-row>
            <v-col
              v-for="bike in bikes"
              :key="bike.title"
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
                    :to="`/${bike.type}/${bike.slug}`"
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                  >
                    <h4
                      class="pa-4 text-center blue-grey--text text--lighten-4"
                    >
                      {{ bike.title | truncate(20) }}
                    </h4>
                    <v-img
                      contain
                      :src="bike.img"
                      :aspect-ratio="1"
                      class="blue-grey lighten-5"
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
                      class="pa-4 text-center blue-grey--text text--lighten-1"
                    >
                      {{ `$${bike.price}` }}
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
  name: "BikeList",

  props: {
    bikes: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: String(),
    },
  },

  data() {
    return {
      //
    };
  },
};
</script>
