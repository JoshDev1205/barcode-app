export const state = () => ({
  barcode: '',
  product: {},
})

export const SET_BARCODE = 'SET_BARCODE'
export const SET_PRODUCT = 'SET_PRODUCT'

export const mutations = {
  [SET_BARCODE](state, payload) {
    state.barcode = payload
  },
  [SET_PRODUCT](state, payload) {
    state.product = payload
  },
}

export const actions = {
  async getProduct({ commit }, payload) {
    const response = await fetch(`api/products/${this.barcode}`)
    const data = await response.json()
    if (data) {
      return commit(SET_PRODUCT, data)
    }
    commit(SET_BARCODE, payload)
  },
}
