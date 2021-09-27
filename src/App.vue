<template>
 <v-app>
   <v-navigation-drawer
       v-model="drawer"
       absolute
       temporary
   >
     <v-list
         nav
         dense
     >
       <v-list-item-group
           v-model="group"
           active-class="deep-purple--text text--accent-4"
       >
         <v-list-item  v-for="list in links" :key="list.id"  :to="list.link">
           <v-list-item-icon>
             <v-icon>{{ list.icon }}</v-icon>
           </v-list-item-icon>
           <v-list-item-title>{{ list.title }}</v-list-item-title>
         </v-list-item>

         <v-list-item @click="logout" v-if="isUserLogin">
           <v-list-item-icon>
             <v-icon>mdi-logout left</v-icon>
           </v-list-item-icon>
           <v-list-item-title>Logout</v-list-item-title>
         </v-list-item>
       </v-list-item-group>
     </v-list>
   </v-navigation-drawer>

   <v-app-bar app dark color="primary">
<!--     <v-toolbar-side-icon></v-toolbar-side-icon>-->
     <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" ></v-app-bar-nav-icon>
     <v-toolbar-title>
      <router-link tag="span" to="/" class="pointer">Vue-V1</router-link>
     </v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-sm-and-down"
                      v-for="list in links"
                      :key="list.id"
     >
       <v-btn text :to="list.link"> <v-icon>{{ list.icon }} left</v-icon>{{ list.title }}</v-btn>

     </v-toolbar-items>
     <v-btn text @click="logout" v-if="isUserLogin"> <v-icon>mdi-logout left</v-icon>Logout</v-btn>

   </v-app-bar>

   <v-main>
     <router-view></router-view>
   </v-main>
   <template v-if="getErrors">
     <v-snackbar
         :timeout="5000"
         :multi-line="true"
         color="error"
         @input="clearError"
         :value="true"
     >
       {{ getErrors }}
       <v-btn text   @click="clearError">X</v-btn>

     </v-snackbar>
   </template>
 </v-app>
</template>

<script>
export default {
  data(){
    return {
      drawer: false,
      group: null,
      // links:[
      //   {title:'Login', icon:'mdi-login', link:'/login'},
      //   {title:'Registration', icon:'mdi-account-plus', link:'/registration'},
      //   {title:'Orders', icon:'mdi-account-check', link:'/orders'},
      //   {title:'New add', icon:'mdi-email-newsletter', link:'/new'},
      //   {title:'My adds', icon:'mdi-cart-plus', link:'/list'},
      // ]
    }
  },
  computed: {
    getErrors(){
      return this.$store.getters.getError
    },
    loading(){
      return this.$store.getters.getLoading
    },
    isUserLogin(){
      return this.$store.getters.isLogin
    },
    links(){
      if( this.isUserLogin ){
        return    [
          {title:'Orders', icon:'mdi-account-check', link:'/orders'},
          {title:'New add', icon:'mdi-email-newsletter', link:'/new'},
          {title:'My adds', icon:'mdi-cart-plus', link:'/list'},
        ]
      }
        return   [
        {title:'Login', icon:'mdi-login', link:'/login'},
        {title:'Registration', icon:'mdi-account-plus', link:'/registration'},
      ]

    }
  },
  methods:{
    clearError(){
      this.$store.dispatch('actClearError')
    },
    logout(){
      this.$store.dispatch('actLogoutUser')
      this.$router.push('/')
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },

}

</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>
