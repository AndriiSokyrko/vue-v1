<template>
  <div>
    <v-container class="mt-5" v-if="loading">
      <v-layout row >
        <v-flex xs12 md12  class="mt-15 text-md-center text-xs-center"
        >
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout row>
        <v-flex>
          <v-carousel v-model="carousel">
            <v-carousel-item
                v-for="(item,i) in getPromoAds"
                :key="i"
                :src="item.imageUrl"
                reverse-transition="fade-transition"
                transition="fade-transition"
            >
              <span>
                <v-btn
                    outlined
                    rounded
                    text
                    bottom
                    :to="'/add/' + item.id"
                >
                  Detail
                </v-btn>
              </span>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>


    <v-container class="mt-5">
      <v-layout row >
        <v-flex
        v-for="item in getAdds"
        :key="item.id"
        xs12 md6 lg3  class="ma-auto text-md-center text-xs-center"

        >
          <v-card
              class="mx-0"
              max-width="100%"
              ma-2
          >
            <v-img
                :src="item.imageUrl"
                height="200px"
            ></v-img>

            <v-card-title>
              {{ item.title}}
            </v-card-title>

            <v-card-subtitle>
              {{ item.subtitle }}
            </v-card-subtitle>

            <v-card-actions>
              <app-buy-model :ad="item" v-if="isLogin"></app-buy-model>
              <v-btn
                  outlined
                  rounded
                  text
                  :to="'/add/' + item.id"
              >
                Detail
              </v-btn>

              <v-spacer></v-spacer>


            </v-card-actions>

          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "Home",
      carousel: '',
      show: false,

    }
  },
  computed:{
    getPromoAds(){
      return this.$store.getters.getAddsPromo
    },
    getAdds(){
      return this.$store.getters.getAdds
    },
    loading(){
      return this.$store.getters.getLoading
    },
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  methods: {

  }

}
</script>

<style scoped>
.mWidth{
  max-width: 23.8%;
  margin: 5px;
}
</style>