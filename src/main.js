import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import  'vuetify/dist/vuetify.min.css'
import  fb from 'firebase'
import Vuetify from "vuetify";
import router from './router'
import store from './store'
import buyModel from './components/common/buyAd'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component('app-buy-model', buyModel)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){
    const firebaseConfig = {
      apiKey: "AIzaSyD7_Ba2OajA_CqTzWXhxzOKOlE5Z1muxp8",
      authDomain: "fir-vue-1-cd05c.firebaseapp.com",
      databaseURL: "https://fir-vue-1-cd05c.firebaseio.com",
      projectId: "firebase-vue-1",
      storageBucket: "firebase-vue-1.appspot.com",
      messagingSenderId: "425957741630",
      appId: "1:425957741630:web:3bc0040a543c1b3e7dad6f",
      measurementId: "G-JB7HH3NH2L"
    };
    fb.initializeApp(firebaseConfig)
    // for autologin

    fb.auth().onAuthStateChanged( user=> {
      if ( user ) this.$store.dispatch('actAvtoLoginUser', user)
    })
    this.$store.dispatch('fetchAds')
  },

}).$mount('#app')
