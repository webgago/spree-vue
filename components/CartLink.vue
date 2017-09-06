<template>
  <a class="nav-link cart-info empty" href="/cart">
    <span class="oi" data-glyph="cart"></span>
    {{ title }}
    <span v-if="hasItems" class="amount">${{ total | formatPrice }}</span>
  </a>
</template>

<script>
  export default {
    computed: {
      count () {
        return this.$store.state.cart.count
      },
      total () {
        const itemTotal = (item) => +item.variant.price * item.count
        return this.$store.state.cart.items.reduce((sum, item) => sum + itemTotal(item), 0)
      },
      hasItems () {
        return this.count > 0
      },
      title () {
        if (this.hasItems) {
          return `Cart: (${this.count})`
        } else {
          return 'Cart: (Empty)'
        }
      }
    }
  }
</script>
