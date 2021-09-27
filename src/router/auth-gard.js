import store from '../store'
export default function (to, from , next){
    if(store.getters.isLogin) {
        next()
    } else {
        next('/login?errorLogin=true')
    }
}