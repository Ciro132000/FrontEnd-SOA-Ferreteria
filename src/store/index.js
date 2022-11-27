import { createStore } from 'vuex'

export default createStore({
  state: {
    producto:null
  },
  mutations: {
    SET_PRODUCTO(state,producto){
      state.producto=producto
    },
    DELETED_PRODUCTO(state){
      state.producto=null
    }
  },
  actions: {
    getProducto(context, producto){
      context.commit('SET_PRODUCTO',producto)
    },
    
  },
  modules: {
  }
})