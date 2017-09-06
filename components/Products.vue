<template>
  <div>
    <div data-hook="products_search_results_heading">
      <div v-if="isEmpty" data-hook="products_search_results_heading_no_results_found">
        t(:no_products_found)
      </div>
      <div v-else-if="keywords.length > 0" data-hook="products_search_results_heading_results_found">
        <h6 class="search-results-title">Spree.t(:search_results, keywords: h(params[:keywords]))</h6>
      </div>
    </div>
    <div v-if="isNotEmpty" id="products" class="row">
      <div v-for="product in products" class="col-md-3 col-sm-6 col-xs-6 product-list-item" itemscope="" itemtype="https://schema.org/Product">
        <Product :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Product from '~/components/Product.vue'

  export default {
    props: ['products'],
    data () {
      return {
        isEmpty: this.products.length === 0,
        keywords: [],
        isNotEmpty: this.products.length > 0
      }
    },
    components: { Product }
  }
</script>

<style>

</style>
