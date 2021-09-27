<template>
  <v-container>
    <v-layout row>
      <v-flex class="lg3 md6 sm6 offset-sm6-3" v-for="item in getMyAdds" :key="item.id" >
        <v-card
            class="ma5"
            max-width="344"
            outlined
            min-height="220"

        >
          <v-list-item three-line>
            <v-list-item-avatar
                tile
                size="80"
                color="grey"
                :src="item.imageUrl"
            >
              <v-img :src="item.imageUrl">

              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ item.title }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ item.description }}
                </v-list-item-title>
              <v-list-item-subtitle>{{ item.subtitle}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn
                outlined
                rounded
                text
                :to="'/add/' + item.id"
            >
              Detail
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      name: "AddList",
      }
  },
  computed:{
    getMyAdds(){
      return this.$store.getters.getMyAdds
    }
  },

  created(){
    this.$store.getters.getMyAdds
  }

}
</script>

<style scoped>

</style>