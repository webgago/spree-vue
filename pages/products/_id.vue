<template>
  <div class="row" itemscope itemtype="https://schema.org/Product">
    <div class="col-md-4 col-sm-5">
      <div data-hook="product_left_part_wrap">
        <div id="product-images">
          <div id="main-image" class="card mb-3">
            <div class="card-body text-center">
              <img itemprop="image" :alt="product.name" :src="mainImageUrl">
            </div>
          </div>
          <div class="mb-5">
            <ul id="product-thumbnails" class="thumbnails list-inline" v-if="hasImages">
              <li v-for="image in images" class='tmb-all list-inline-item' @click.prevent="setImage" @mouseover="hoverImage" @mouseleave="restoreImage">
                <a :href="imageProduct(image)">
                  <img :src="imageMini(image)" class="img-thumbnail"/>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="product.product_properties.length > 0">
          <h3 class="product-section-title mb-3">Properties</h3>
          <table class="table table-striped">
            <tbody>
            <tr class="" v-for="product_property in product.product_properties">
              <td><strong>{{ product_property.property_name }}</strong></td>
              <td>{{ product_property.value }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-md-8 col-sm-7" data-hook="product_right_part">
      <div data-hook="product_right_part_wrap">
        <div>
          <h1 class="product-title" itemprop="name">{{ product.name }}</h1>

          <div class="card mb-3" itemprop="description" data-hook="description">
            <div class="card-body">
              {{ product.description }}
            </div>
          </div>

          <CartForm :product="product"/>
        </div>

        <div v-if="product.classifications.length > 0" class="five">
          <h3 class="product-section-title">Look for similar items</h3>
          <ul class="list-group">
            <li v-for="taxon in product.classifications" class="list-group-item">
              <a :href="seoUrl(taxon.taxon)">{{ taxon.taxon.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CartForm from '~/components/CartForm.vue'
  import axios from 'axios'

  const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1/',
    timeout: 5000,
    headers: {'X-Spree-Token': 'c8f29730190c6fe10a23e040bb6dee961dfeecbd972e0306'}
  })

  export default {
    head () {
      return {
        title: this.product.name,
        meta: [
          { hid: 'description', name: 'description', content: this.product.description }
        ]
      }
    },
    async asyncData ({ params }) {
      let { data } = await api.get(`products/${params.id}`)
      return { product: data }
    },
    data () {
      return {
        currentImage: null,
        mainImage: null
      }
    },
    created () {
      this.mainImage = `http://localhost:3001${this.images[ '0' ].product_url}`
    },
    methods: {
      imageMini (image) {
        return `http://localhost:3001${image.mini_url}`
      },
      imageProduct (image) {
        return `http://localhost:3001${image.product_url}`
      },
      seoUrl (taxon) {
        return `/t/${taxon.permalink}`
      },
      hoverImage (e) {
        this.currentImage = e.target.parentElement.href
      },
      restoreImage () {
        this.currentImage = null
      },
      setImage (e) {
        this.mainImage = e.target.parentElement.href
      }
    },
    computed: {
      images () {
        const variants = this.product.variants.reduce((sum, variant) => sum.concat(variant.images), [])
        return this.product.master.images.concat(variants)
      },
      hasImages () {
        return this.images.length > 0
      },
      mainImageUrl () {
        return this.currentImage || this.mainImage
      }
    },
    components: { CartForm }
  }
</script>

<style lang="scss">
</style>
