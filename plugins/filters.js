import Vue from 'vue'
import numeral from 'numeral'

Vue.filter('formatPrice', function (value) {
  return numeral(value).format('0,0.00')
})
