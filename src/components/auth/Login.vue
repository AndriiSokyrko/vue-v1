<template>
  <v-container>
    <v-layout>
      <v-flex class="sm12 md6 lg6">
        <v-form  ref="form" v-model="valid" validation>
          <v-text-field
              v-model="email"
              :error-messages="errors"
              label="Email"
              :rules="emailRules"
          ></v-text-field>
          <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password"
              :rules="passwordRules"
          ></v-text-field>
          <v-checkbox
              v-model="checkbox"
              label="Do you agree?"
          ></v-checkbox>

          <v-btn
              class="mr-4"
              :loading="loading"
              :disabled="!valid|| loading"
              @click="onLogin"
          >
            submit
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "Login",
      valid: false,
      checkbox: true,
      email: '',
      password: '',
      errors: [],
      passwordRules: [
        v => !!v || 'Must be valid e-mail',
        v => (v && v.length <= 6) || 'E-mail is required'
      ],
      emailRules: [
         value => !!value || 'Required.',
         value => value.length <= 20 || 'Max 20 characters',
         value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ]
    }
  },
  computed:{
    loading(){
      return this.$store.getters.getLoading;
    }
  },
  methods:{
    onLogin(){
      if (this.$refs.form.validate()) {
        const user = {
          email : this.email,
          password : this.password
        }
        this.$store.dispatch('actLoginUser', user)
            .then( () => this.$router.push('/') )
            .catch(error=> {
              this.$store.dispatch('actError',error)
              console.log(error.message)
            })
      }
    }
  },
  created(){
    if(this.$route.query['errorLogin']){
      this.$store.dispatch('actError','Please login or register')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>