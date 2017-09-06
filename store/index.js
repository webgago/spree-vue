export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const fetch = () => {
  console.log('fetch...')
}

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    return dispatch('cart/fetch')
  },
  fetch () {
    console.log('fetch...')
  }
}
