import localforage from 'localforage'

export const state = () => {
  return {
    orderNumber: null,
    items: [],
    count: 0
  }
}

export const mutations = {
  fetch (state) {
    console.log('fetched...')
  },
  add (state, { variant, count }) {
    state.count += count
    state.items.push({
      variant: variant,
      count: count
    })
  },
  createOrder (state, { orderNumber }) {
    localforage.setItem('orderNumber', orderNumber)
    state.orderNumber = orderNumber
  },
  remove (state, { item }) {
    state.items.splice(state.items.indexOf(item), 1)
  }
}

export const actions = {
  fetch ({ state, commit, dispatch }) {
    console.log('fetch...')
  },
  addToCart ({ state, commit, dispatch }, { variant, quantity }) {
    if (state.orderNumber) {
      const lineItem = { variant_id: variant.id, quantity }
      this.api.post(`orders/${state.orderNumber}/line_items`, { line_item: lineItem }).then(({ data }) => {
        commit('add', { variant: variant, count: +quantity })
      })
    } else {
      dispatch('createOrder', { variant, quantity })
    }
  },
  createOrder ({ commit }, { variant, quantity }) {
    const order = { line_items: [{ variant_id: variant.id, quantity }] }
    this.api.post(`orders`, { order }).then(({ data }) => {
      commit('createOrder', { orderNumber: data.number })
      commit('add', { variant: variant, count: +quantity })
      return data.number
    })
  }
}
