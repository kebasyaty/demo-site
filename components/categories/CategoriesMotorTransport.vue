<!--
-----------------------------
Categories of motor transport
-----------------------------
-->
<template>
  <v-card flat>
    <v-row class="d-flex justify-center">
      <v-col v-for="(category, index) in categories" :key="index" cols="auto">
        <v-btn text color="red darken-1" nuxt :to="`/${category.slug}`">
          {{ category.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CategoriesMotorTransport",

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
