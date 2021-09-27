<template>
  <v-container>
    <v-layout>
      <v-flex class="sm12 md6 lg6">
        <v-form  ref="form" v-model="valid" validation>
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
              :disabled="!valid || !image || loading"
              @click="onSubmit"
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
      title: "",
      subtitle: "",
      valid: false,
      checkboxPromo: true,
      name: '',
      imageUrl: '',
      image: '',
      description : '',
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
  computed:{
    loading () {
      return this.$store.getters.getLoading
    }
  },
  methods:{
    onSubmit(){
      if (this.$refs.form.validate() || this.image) {
        const user = {
          id: 0,
          title : this.title,
          subtitle : this.subtitle,
          description : this.description,
          imageUrl: this.imageUrl,
          image: this.image,
          promo: this.checkboxPromo,
          ownerId: 0
        }
        this.$store.dispatch('createAd', user).then(
            ()=> this.$router.push('/list')
        )
        // console.log(user)
      }
    },
    uploadImage(){
        this.$refs.fileInput.click()
    },
    onFileChange(event){
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => this.imageUrl = reader.result
      reader.readAsDataURL(file)
      this.image = file
    }

  }
}
</script>

<style scoped>

</style>