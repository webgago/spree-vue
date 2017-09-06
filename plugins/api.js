import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
  timeout: 5000,
  headers: { 'X-Spree-Token': 'c8f29730190c6fe10a23e040bb6dee961dfeecbd972e0306' }
})

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData & fetch
  app.api = API
  store.api = API
}
