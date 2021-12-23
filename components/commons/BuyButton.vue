<template>
  <div v-if="product">
    <v-btn
      v-if="!isProductAdded"
      light
      color="amber lighten-2"
      @click.prevent="buyClickHandler"
    >
      <v-icon>mdi-cart</v-icon>Купить
    </v-btn>
    <v-btn
      v-else
      dark
      href="#"
      color="blue darken-2"
      @click.prevent="addedClickHandler"
    >
      Товар в корзине
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("cart", {
      products: "products",
    }),
    isProductAdded() {
      return this.products.find((p) => p.id === this.product.id);
    },
  },

  methods: {
    ...mapActions("cart", {
      addProduct: "addProduct",
      removeProduct: "removeProduct",
    }),
    buyClickHandler() {
      this.addProduct(this.product);
    },
    addedClickHandler() {
      this.removeProduct(this.product.id);
    },
  },
};
</script>
