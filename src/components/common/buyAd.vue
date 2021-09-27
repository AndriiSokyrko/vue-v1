<template>
  <div>
    <v-btn outlined rounded text @click="modelDialog=true">Buy</v-btn>
    <v-dialog width="400px" v-model="modelDialog">

      <v-card
          class="ma5"
          max-width="100%"
          outlined
          min-height="220"

      >
        <v-container>
          <v-layout>
            <v-flex>
              <v-form ref="form" v-model="valid" validation>
                <v-text-field
                    v-model="name"
                    label="Name"
                    :rules="nameRules"
                ></v-text-field>
                <v-text-field
                    v-model="phone"
                    label="Phone"
                    :rules="phoneRules"
                ></v-text-field>
                <v-textarea
                    v-model="description"
                    label="Description"
                    :rules="descriptionRules"
                ></v-textarea>
                <v-spacer></v-spacer>
                  <v-btn
                      class="ml-5"
                      :loading="loading"
                      :disabled="!valid  || loading"
                      @click="onSave"
                  >
                    Buy
                  </v-btn>
                  <v-btn
                      class="ma-5"
                      :loading="loading"
                      :disabled="!valid   || loading"
                      @click="onCancel"
                  >
                    Cancel
                  </v-btn>

              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['ad'],
    data() {
      return {
        modelDialog: false,
        id: this.ad.id,
        // ownerId: this.ad.ownerId,
        // title: this.ad.title,
        // subtitle: this.ad.subtitle,
        // imageUrl: this.ad.imageUrl,
        // image: this.ad.imageUrl,
        // checkboxPromo: this.add.checkboxPromo,
        // description : this.ad.description,
        valid: false,
        name: '',
        phone:'',
        description:'',
        nameRules: [
          v => !!v || 'The title must be not empty',
          v => (v && v.length >= 6) || 'The tile  must be not less 6 chars'
        ],
        phoneRules: [
          v => !!v || 'The subtitle must be not empty',
          v => (v && v.length >= 6) || 'The subtitle  must be not less 6 chars'
        ],
        descriptionRules: [
          v => !!v || 'Description must be not empty',
          v => (v && v.length >= 6) || 'The description  must be not less 6 chars'
        ],

      }
  },
  computed: {
    loading () {
      return this.$store.getters.getLoading
    },
  },
  methods: {
    onCancel(){
      this.modelDialog=false

    },
    onSave() {
      if (this.$refs.form.validate() || this.image) {
        const user = {
          id: this.ad.id,
          name: this.name,
          phone: this.ad.subtitle,
          description: this.description,
          ownerId: this.ad.ownerId,
          done: false
        }
        this.$store.dispatch('orderAd', user).then(
            () => this.$router.push('/list')
        )
        this.modelDialog = false

        // console.log(user)
      }
    },
   }
}
</script>

<style scoped>

</style>