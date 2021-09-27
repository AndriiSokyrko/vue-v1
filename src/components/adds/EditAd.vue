<template>
  <div>
    <v-btn outlined rounded text @click="modelDialog=true">Edit</v-btn>
    <v-dialog md8 width="400px" v-model="modelDialog">

      <v-card
          class="ma5"
          max-width="100%"
          outlined
          min-height="220"

      >
        <v-container>
          <v-layout>
            <v-flex class="sm12 md6 offset-md-3 lg8 offset-lg-2">
              <v-form ref="form" v-model="valid" validation>
                <v-text-field
                    v-model="title"
                    label="Title"
                    :rules="titleRules"
                ></v-text-field>
                <v-text-field
                    v-model="subtitle"
                    label="Subtitle"
                    :rules="subtitleRules"
                ></v-text-field>
                <v-textarea
                    v-model="description"
                    label="Description"
                    :rules="descriptionRules"
                ></v-textarea>
                <v-btn
                    @click="uploadImage"
                    label="Upload Image"
                    color="yellow"
                    class="ma-5"
                >
                  <v-icon
                      right
                      dark
                  >
                    mdi-cloud-upload
                  </v-icon>
                  Upload
                </v-btn>
                <input ref="fileInput" type="file" style="display: none" @change="onFileChange">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    :src=imageUrl
                    v-if="imageUrl"
                ></v-img>

                <v-checkbox
                    v-model="checkboxPromo"
                    label="Add to carousel?"
                ></v-checkbox>

                <v-btn
                    class="mr-4"
                    :loading="loading"
                    :disabled="!valid  || loading"
                    @click="onSave"
                >
                  Save
                </v-btn>
                <v-btn
                    class="mr-4"
                    :loading="loading"
                    :disabled="!valid  || loading"
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
        ownerId: this.ad.ownerId,
        title: this.ad.title,
        subtitle: this.ad.subtitle,
        imageUrl: this.ad.imageUrl,
        image: '',
        // checkboxPromo: this.add.checkboxPromo,
        description : this.ad.description,
        valid: false,
        checkboxPromo: true,
        name: '',
        titleRules: [
          v => !!v || 'The title must be not empty',
          v => (v && v.length >= 6) || 'The tile  must be not less 6 chars'
        ],
        subtitleRules: [
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
    }
  },
  methods: {
    onCancel(){
      this.modelDialog=false

    },
    onSave() {
      if (this.$refs.form.validate()) {
        const user = {
          id: this.id,
          title: this.title,
          subtitle: this.subtitle,
          description: this.description,
          imageUrl: this.ad.imageUrl,
          image: this.image,
          promo: this.checkboxPromo,
          ownerId: this.ad.ownerId
        }
        this.$store.dispatch('updateAd', user).then(
            () => this.$router.push('/list')
        )
        this.modelDialog = false

        // console.log(user)
      }
    },
      uploadImage(){
        this.$refs.fileInput.click()
      },
      onFileChange(event){
        const file = event.target.files[0]
        this.image = file
        const reader = new FileReader()
        reader.onload = () => this.imageUrl = reader.result
        reader.readAsDataURL(file)
      }
  }
}
</script>

<style scoped>

</style>