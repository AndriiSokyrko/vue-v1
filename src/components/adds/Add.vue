<template>
  <v-container>
    <v-layout>
      <v-flex class="sm12 md6 lg8 offset-md-3 offset-lg-2 ">
        <v-card
            class="ma5"
            max-width="100%"
            outlined
            min-height="220"

        >
          <v-list-item>
            <v-avatar
                tile
                size="80"
                color="grey"
                class="mr-4 sm12 md6 lg6"
            >
              <v-img :src="getItemById.imageUrl">

              </v-img>
            </v-avatar>

            <v-list-item-content class="col-8">
              <v-list-item-title class="text-overline mb-4">
                {{ getItemById.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ getItemById.subtitle}}</v-list-item-subtitle>

              {{ getItemById.description }}
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad :ad="getItemById"></app-edit-ad>
            <app-buy-model :ad="getItemById"></app-buy-model>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAd from './EditAd'
export default {
  props:['id'],
  data() {
    return {
      name: "Login",

    }
  },
  computed:{
    getItemById(){
      return this.$store.getters.getByIdAdds(this.id)
    }
  },
  methods:{

  },
  components:{
    appEditAd: EditAd
  }
}
</script>

<style scoped>

</style>