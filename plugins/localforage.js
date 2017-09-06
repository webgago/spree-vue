import localforage from 'localforage'
import localforageStartsWith from 'localforage-startswith'

localforage.config({
  name: 'spree-vue-frontend'
})

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData & fetch
  app.localforage = localforage
  store.localforage = localforage
}

