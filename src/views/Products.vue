<template>
  <div class="page-wrapper">
    <h1 class="products-page-title">Games page</h1>
    <p>Add games you play to your library. Future updates will let you meet new people based on the games they play</p>
    <product-list class="product-list"></product-list>
    <add-product v-if="networkOnLine"></add-product>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductList from "@/components/ProductList";
import AddProduct from "@/components/AddProduct";

export default {
  components: { ProductList, AddProduct },
  computed: mapState("app", ["networkOnLine"])
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

p {
  text-align: center;
  max-width: 500px;
  margin: auto;
}

.products-page-title {
  text-align: center;
  margin-bottom: 30px;
}

.product-list {
  margin: 20px 0;
}
</style>
