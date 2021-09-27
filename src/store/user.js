import  fb from 'firebase'
class User {
    constructor( id ) {
        this.id = id
    }
}
export default {
    state:{
        user:null
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        },
        setLogout(state){
            fb.auth().signOut();
            state.user= null
        }
    },
    actions: {
        async actRegisterUser({commit}, { email, password}){

           const user = await fb.auth().createUserWithEmailAndPassword(email, password)
            try {
                    commit('setUser', new User(user.uid))
                    commit('setLoading',false)
            } catch(error){
                    commit('setLoading', false)
                    commit('setError', error.message)
                throw error
            }

        },
        async actLoginUser({commit}, { email, password }){
            const user = await fb.auth().signInWithEmailAndPassword(email, password)
            try {
                // console.log(user)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
                // console.log(this.$store.getters.getUser)
            } catch(error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error

            }
        },
        actAvtoLoginUser({commit}, payload){
            commit('setClearError')
            commit('setLoading',true)
            if (payload) commit('setUser', new User(payload.uid))
            commit('setLoading',false)

        },
        actLogoutUser({commit}){
            commit('setLogout')
        }
    },
    getters:{
        getUser: state=> state.user,
        isLogin: state=> state.user !== null
    }

}
