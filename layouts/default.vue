<template>
  <v-app>
    <v-app-bar app>
      <v-btn
        fab
        small
        depressed
        class="ml-2 mr-4"
        nuxt
        to="/"
        color="grey darken-4"
      >
        <MotoramaLogo class="logo-icon" />
      </v-btn>
      <v-toolbar-title
        class="font-weight-bold blue-grey--text text--lighten-4"
        >{{ siteName }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid class="px-0 pt-0">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer dark padless color="#1e1e1e">
      <v-row justify="center" no-gutters>
        <v-card
          flat
          tile
          dark
          :max-width="1200"
          class="blue-grey--text text--lighten-4 text-center"
        >
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 blue-grey--text text--lighten-4"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="pt-0">
            <v-card
              flat
              tile
              :min-height="300"
              class="blue-grey--text text--lighten-4 text-center"
            >
              Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
              amet. Mauris cursus commodo interdum. Praesent ut risus eget metus
              luctus accumsan id ultrices nunc. Sed at orci sed massa
              consectetur dignissim a sit amet dui. Duis commodo vitae velit et
              faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue
              vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu
              ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="blue-grey--text text--lighten-4">
            <span>&#169; </span>{{ new Date().getFullYear() }} —
            <strong>{{ siteName }}</strong>
          </v-card-text>
        </v-card>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MotoramaLogo from "~/assets/svg/logo.svg?inline";

export default {
  components: {
    MotoramaLogo,
  },

  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },

  head() {
    const canonical = `https://motorama.herokuapp.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, "")}`;
    return {
      script: [
        /*
          Эту вещь можно смело раскомментировать во время дебага.
          Зашли на сайт с телефона и автоматически открылась консоль браузера на телефоне.
          Очень удобно так как можно не прибегать к более сложным инструментам отладки и экономить себе время.
        */
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
      link: [{ rel: "canonical", href: canonical }],
    };
  },

  computed: {
    ...mapState({
      siteName: "siteName",
    }),
  },
};
</script>

<style scoped>
.logo-icon {
  height: 20px;
  fill: #cfd8dc;
}
</style>
