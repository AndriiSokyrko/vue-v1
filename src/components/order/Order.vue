<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-card
            max-width="475"
            class="mx-auto"
        >
          <v-list
              subheader
              two-line
              flat
              v-for="item in orders"
              :key="item.id"
          >
            <v-subheader>Hangout notifications</v-subheader>

               <v-list-item>
                  <v-list-item-action>
                    <v-checkbox
                        :input-value="item.done"
                        color="primary"
                        @click="doneOrder(item)"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.phone}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.description}}</v-list-item-subtitle>
                  </v-list-item-content>
                 <v-list-item-action>
                   <v-btn
                       @click="detailOrder(item.id)"
                       color="primary"
                   >
                     View detail of order
                   </v-btn>
                 </v-list-item-action>
              </v-list-item>

          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import orders from "../../store/orders";

export default {
  data(){
    return {
      name: "Order",
    }
  },
  computed:{

    getLoading(){
      return this.$store.getters.getLoading
    },
    orders(){
      // console.log(this.$store.getters.getOrders)
      return this.$store.getters.getOrders
    }
  },
  methods: {
    doneOrder(item){
      this.$store.dispatch('doneOrder', item.id).then()
      .catch((error)=>{ this.$store.dispatch('actError', error.message)})
    },
    detailOrder(varId){
      return this.$router.push('/add/'+varId)
    }
  },
  created(){
    this.$store.dispatch('fetchOrders')
  }

}
</script>

<style scoped>

</style>