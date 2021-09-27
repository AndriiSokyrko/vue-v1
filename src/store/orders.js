import fb from 'firebase'

class Order {
    constructor(payload){
        // console.log(payload)

        this.id = payload.id
        this.name = payload.name
        this.phone = payload.phone
        this.description = payload.description
        this.ownerId = payload.ownerId
        this.done = payload.done
        this.key = ''
    }
}
export default {
    state:{
        orders:[]
    },
    mutations:{
        updateOrders(state, payload) {
            const order = state.orders.find( order => order.id == payload)
            order.done = !order.done
            // console.log(state.orders)
        },
        addOrders(state, payload){
            // console.log(payload)
            state.orders = payload
        },
        loadOrders(state, payload){
            state.orders = payload
}

    },
    actions:{
        async orderAd({commit},payload){

            commit('setClearError')
            commit('setLoading',true)
            try {
                await fb.database().ref(`users/${payload.ownerId}/orders`).push(new Order(payload))
                commit('addOrders',payload)
            } catch(error){

              commit('setLoading', false)
              commit('setError', error.message)
                throw  error
            }
        },
        async doneOrder({commit, getters}, payload){
            commit('setClearError')
            commit('setLoading', true)
            // console.log(payload)
            const ownerId = getters.getUser.id;
            // const getOrderByKey = state.orders.find(order=> order.id===payload)
            // const getStatusDone = !getOrderByKey.done
            try{
                const orderVal = await fb.database().ref(`users/${ownerId}/orders`).once('value')
                const orders = orderVal.val()
                // console.log("orders")
                // console.log(ownerId)
                if (orders !== null) {
                    Object.keys(orders).forEach(key => {
                        const order = orders[key]
                        console.log(order)
                        if (order.id === payload) {
                             fb.database().ref(`/users/${ownerId}/orders`).child(key).update(
                                {'done':!order.done})
                        }
                    })
                }
                commit('updateOrders', payload )
                commit('setLoading', false )
            } catch(error){
                commit('setError', error.message)
                commit('setLoading',false)
                throw  error

            }

        },
        async fetchOrders({commit, getters}){
            commit('setClearError')
            commit('setLoading', true)
            const resultOrders = []
            const ownerId = getters.getUser.id;
            try {
                const orderVal = await fb.database().ref(`users/${ownerId}/orders`).once('value')
                const orders = orderVal.val()
                // console.log("orders")
                // console.log(ownerId)
                if (orders !== null) {
                    Object.keys(orders).forEach(key => {
                        const order = orders[key]
                        console.log(order)
                            resultOrders.push(
                               new Order(order))
                        })
                    }
                console.log(resultOrders)

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch(error){
                commit('setError', error.message)
                commit('setLoading',false)
                throw  error

            }
        }
    },
    getters: {
        getOrdersDone(state){
            return state.orders.filter((order) => order.done)
        },
        getOrdersUnDone(state){
            return state.orders.filter((order) => !order.done)
        },
        getOrders(state, getters){

            return getters.getOrdersUnDone.concat(getters.getOrdersDone)
        }
    }
}
