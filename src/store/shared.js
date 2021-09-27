export default {
    state:{
        loading: false,
        error: null
    },
    mutations:{
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        setClearError(state){
            state.error = null
        }
    },
    actions:{
        actLoading({commit}, payload){
            commit('setLoading',payload)
        },
        actError({commit}, payload){
            commit('setError',payload)
        },
        actClearError({commit}){
            commit('setClearError')
        }
    },
    getters:{
        getLoading(state){
            return state.loading
        },
        getError(state){
            return state.error
        }
    }
}