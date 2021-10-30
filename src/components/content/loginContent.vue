<template>
  <div id="loginContent">
    <div v-if="!isLogged">
      <LoaderBar v-if="sending" />
      <form novalidate class="md-layout" @submit.prevent="checkForm">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">

                <md-snackbar :md-active.sync="showError">
                  <span>Ошибка! {{ textError }}</span>
                  <md-button class="md-icon-button" @click="showError = false">
                    <md-icon class="md-accent">keyboard_arrow_down</md-icon>
                  </md-button>
                </md-snackbar>

                <md-field md-clearable :class="getValidationClass('login')">
                  <label for="login">Логин</label>
                  <md-input autocomplete="login" v-model="form.login" :disabled="sending" type="login" name="login" id="login" />
                  <span class="md-error" v-if="!$v.form.login.required">Обязательное поле!</span>
                  <span class="md-error" v-else-if="!$v.form.login.minLength || !$v.form.login.maxLength">Некорректный логин!</span>
                </md-field>

                <md-field :class="getValidationClass('password')">
                  <label for="password">Пароль</label>
                  <md-input autocomplete="current-password" v-model="form.password" :disabled="sending" type="password" name="password" id="password" />
                  <span class="md-error" v-if="!$v.form.password.required">Обязательное поле!</span>
                  <span class="md-error" v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Некорректный пароль!</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Войти</md-button>
          </md-card-actions>
          <md-snackbar :md-active.sync="userSaved">{{ lastUser }} успешно вошёл в аккаунт!</md-snackbar>
        </md-card>
        <md-button to="/register" class="link">Ещё не зарегестрированы? Зарегестрироваться</md-button>      
      </form>
    </div>
    <div v-else class="display">
      <span class="md-display-3">{{ textLoggedUser }}</span>
    </div>
  </div>
</template>

<script>
import LoaderBar from './../loader/loaderBar'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
const axios = require('axios')

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      login: null,
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    showError: false,
    textError: '',
    error: null,
    isLogged: 0,
    textLoggedUser: ''
  }),
  components: {
    LoaderBar
  },
  validations: {
    form: {
      login: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(30)
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
      this.form.login = null,
      this.form.password = null
    },
    saveUser () {
      this.sending = true
      window.setTimeout(() => {
        this.lastUser = `${this.form.login}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    checkForm () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendData()
      }
    },
    sendData() {
      axios({
        method: "post",
        data: {
          login: this.form.login,
          password: this.form.password
        },
        url: "ajax/login.php",
        responseType: 'json'
      }).then(response => {
        if (response.data == 'Ok') {
          this.saveUser(),
          window.setTimeout(() => {
            this.$router.push('/')
            this.isLogged = 1
          }, 1000)
        } else {
          this.showError = true,
          this.textError = response.data
        }
      }).catch(e => {
        this.showError = true,
        this.textError = e
      })
    },
    getUserInfo() {
      axios({
        method: "post",
        url: "ajax/getUserInfo.php"
      })
      .then(response => {
        this.user = response.data
      })
    },
    isLoggedUser() {
      axios({
        method: "post",
        url: "ajax/isLogged.php"
      })
      .then(response => {
        if (response.data == 1) {
          this.isLogged = 1,
          this.textLoggedUser = 'Вы успешно вошли в аккаунт'
          this.getUserInfo()
        } else {
          this.isLogged = 0
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
#loginContent {
  max-width: 550px;
  margin: 0 auto;
}
.link {
  font-size: 10px;
  width: 80%;
  margin: 10px auto;
}
.display {
  text-align: center;
  margin-top: 50px;
}
</style>