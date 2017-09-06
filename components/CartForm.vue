<template>
  <div class="row" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <div v-if="hasVariants" id="product-variants" class="col-md-6">
      <h3 class="product-section-title">Variants</h3>
      <ul class="list-group mb-3">
        <li class="list-group-item" v-for="variant in product.variants">
          <input type="radio" name="variant_id" :id="variantId(variant)" :value="variant" v-model="selectedVariant">
          <label :for="variantId(variant)">
            <span class="variant-description">
              {{ variant.options_text }}
            </span>
            <span class="price diff">{{ priceDiff(variant) }}</span>
            <span v-if="!variant.in_stock" class="out-of-stock">Out of Stock</span>
          </label>
        </li>
      </ul>
    </div>
    <input v-else type="hidden" name="variant_id" :value="product.master.id">

    <div class="col-md-5">
      <h3 class="product-section-title">Price</h3>

      <div class="list-group">
        <div class="list-group-item">
          <div>
            <span class="lead price selling" itemprop="price" :content="product.price">
              {{ displayPrice }}
            </span>
            <span itemprop="priceCurrency" :content="currentCurrency"></span>
          </div>

          <link v-if="canSupply" itemprop="availability" href="https://schema.org/InStock" />
          <span v-else-if="hasNoVariants" class="out-of-stock">Out of Stock</span>
        </div>

        <div class="list-group-item" v-if="canSupply">
          <div class="input-group">
            <input type="number" v-model="count" name="quantity" id="quantity" value="1" class="title form-control" min="1" @keyup.enter="addItemToCart">
            <span class="input-group-btn">
              <button name="button" type="submit" class="btn btn-success" @click="addItemToCart">
                Add To Cart
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['product'],
    data () {
      return {
        selectedVariant: null,
        count: 1,
        currentCurrency: 'USD'
      }
    },
    created () {
      if (this.hasVariants) {
        this.selectedVariant = this.product.variants[0]
      } else {
        this.selectedVariant = this.product.master
      }
    },
    methods: {
      priceDiff (variant) {
        const diff = this.product.price - variant.price
        if (diff < 0) {
          return `(Add: $${+diff}.00)`
        }
      },
      variantId (variant) {
        return `variant_id_${variant.id}`
      },
      addItemToCart () {
        this.addToCart({variant: this.selectedVariant, quantity: this.count})
      },
      ...mapActions({addToCart: 'cart/addToCart'})
    },
    computed: {
      displayPrice () {
        return (this.selectedVariant || this.product).display_price
      },
      hasNoVariants () {
        return !this.hasVariants
      },
      hasVariants () {
        return this.product.variants.length > 0
      },
      canSupply () {
        return this.product.total_on_hand > 0
      }
    }
  }
</script>
