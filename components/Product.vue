<template>
  <div class="panel panel-default">
    <div class="panel-body text-center product-body">
      <a itemprop="url" :href="url">
        <img itemprop="image" alt="Ruby on Rails Tote" :src="smallImageUrl"><br>
        <span class="info" itemprop="name" :title="product.name">{{ product.name }}</span>
      </a><br>
    </div>
    <div class="panel-footer text-center">
        <span itemprop="offers" itemscope="" itemtype="https://schema.org/Offer">
          <span class="price selling lead" itemprop="price" content="15.99">
            {{ product.display_price }}
          </span>
          <span itemprop="priceCurrency" content="USD"></span>
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'product' ],
    computed: {
      images () {
        const variants = this.product.variants.reduce((sum, variant) => sum.concat(variant.images), [])
        return this.product.master.images.concat(variants)
      },
      smallImageUrl () {
        return `http://localhost:3001${this.images['0'].small_url}`
      },
      url () {
        return `/products/${this.product.slug}`
      }
    }
  }
</script>
