<template>
  <div id="addArticleContent">
    <div v-if="isLogged">
      <LoaderBar v-if="sending" />
      <div v-else>
        <transition name="animateOpacity" appear>
          <md-card class="md-layout-item md-small-size-100">
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-snackbar :md-active.sync="saveArticle">{{ textSnackbar }}</md-snackbar>

                  <md-field :class="getValidationClass('title')">
                    <label for="title">Название</label>
                    <md-input v-model="form.title" :disabled="sending" name="title" id="title"></md-input>
                    <span class="md-error" v-if="!$v.form.title.required">Обязательное поле!</span>
                    <span class="md-error" v-else-if="!$v.form.title.minLength">Слишком маленький заголовок!</span>
                  </md-field>

                  <md-field :class="getValidationClass('text')">
                    <label>Введите текст</label>
                    <md-textarea v-model="form.text" :disabled="sending" name="text" id="text" md-autogrow></md-textarea>
                    <span class="md-error" v-if="!$v.form.text.required">Обязательное поле!</span>
                    <span class="md-error" v-else-if="!$v.form.text.minLength">Слишком маленький текст!</span>
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button type="submit" class="md-primary" @click="checkForm()">Опубликовать</md-button>
            </md-card-actions>
          </md-card>
        </transition>
      </div>
    </div>
    <div v-else class="display">
      <span class="md-display-3">{{ textNotLogged }}</span>
    </div>
  </div>  
</template>

<script>
import LoaderBar from './../loader/loaderBar'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
const axios = require('axios')

export default {
  mixins: [validationMixin],
  data: () => ({
    initial: null,
    autogrow: null,
    form: {
      title: null,
      text: null
    },
    sending: false,
    textSnackbar: '',
    saveArticle: false,
    isLogged: 0,
    textNotLogged: ''
  }),
  components: {
    LoaderBar
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      text: {
        required,
        minLength: minLength(10)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.form.title = null,
      this.form.text = null
    },
    checkForm () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.publicate()
      }
    },
    publicate() {
      this.sending = true,
      window.setTimeout(() => {
        this.addArticle();
        this.textSnackbar = 'Статья опубликована в профиле и в ленте!',
        this.saveArticle = true,
        this.sending = false
        this.clearForm()
      }, 1000)
    },
    addArticle() {
      axios({
        method: "post",
        data: {
          title: this.form.title,
          text: this.form.text
        },
        url: "ajax/addArticle.php",
        responseType: "json",
      })
    },
    isLoggedUser() {
      axios({
        method: "post",
        url: "ajax/isLogged.php"
      }).then(response => {
        if (response.data == 1) {
          this.isLogged = 1
        } else {
          this.isLogged = 0,
          this.textNotLogged = 'Войдите в аккаунт'
        }
      })
    }
  },
  created() {
    this.isLoggedUser()
  }
}
</script>

<style scoped>
#addArticleContent {
  max-width: 550px;
  margin: 0 auto;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.display {
  margin-top: 20px;
  text-align: center;
}
</style>