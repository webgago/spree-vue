<template>
  <div class="row" data-hook>
    <!--<%= breadcrumbs(@taxon) %>-->

    <aside id="sidebar" class="col-sm-4 col-md-3" data-hook="">
      <div data-hook="homepage_sidebar_navigation">

        <nav id="taxonomies" class="sidebar-item" data-hook="">
          <h4 class="taxonomy-root">Shop by Categories</h4>
          <div class="list-group"><a class="list-group-item" href="/t/categories/bags">Bags</a>
            <a class="list-group-item" href="/t/categories/mugs">Mugs</a>
            <a class="list-group-item" href="/t/categories/clothing">Clothing</a></div>
          <h4 class="taxonomy-root">Shop by Brands</h4>
          <div class="list-group"><a class="list-group-item" href="/t/brands/ruby">Ruby</a>
            <a class="list-group-item" href="/t/brands/apache">Apache</a>
            <a class="list-group-item" href="/t/brands/spree">Spree</a>
            <a class="list-group-item" href="/t/brands/rails">Rails</a></div>
        </nav>

      </div>

    </aside>

    <div id="content" class="col-sm-8" data-hook>
      <!--<%= flash_messages %>-->
      <Products :products="products"/>
    </div>

    <!--<%= yield :templates %>-->
  </div>
</template>

<script>
import Products from '~/components/Products.vue'

export default {
  components: {
    Products
  },
  async asyncData () {
    let { data } = await this.api.get(`products`)
    return { products: data.products }
  }
}
</script>

<style lang="scss">
.links {
  padding-top: 15px;

  a {
    margin-right: 10px;
  }
}
</style>
