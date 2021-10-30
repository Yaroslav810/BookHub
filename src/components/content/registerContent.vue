<template>
  <div id="registerContent">
    <div v-if="!isLogged">
      <LoaderBar v-if="sending" />
      <form novalidate @submit.prevent="checkForm" class="md-layout">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">

                <md-snackbar :md-active.sync="showError">
                  <span>Ошибка! {{ textError }} </span>
                  <md-button class="md-icon-button" @click="showError = false">
                    <md-icon class="md-accent">keyboard_arrow_down</md-icon>
                  </md-button>
                </md-snackbar>

                <md-field md-clearable :class="getValidationClass('firstName')">
                  <label for="first-name">Имя</label>
                  <md-input name="first-name" id="first-name" autocomplate="given-name" v-model="form.firstName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.firstName.required">Введите имя!</span>
                  <span class="md-error" v-else-if="!$v.form.firstName.minLength">Слишком маленькое имя!</span>
                  <span class="md-error" v-else-if="!$v.form.firstName.maxLength">Слишком большое имя!</span>
                </md-field>

                <md-field md-clearable :class="getValidationClass('lastName')">
                  <label for="last-name">Фамилия</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.lastName.required">Введите фамилию!</span>
                  <span class="md-error" v-else-if="!$v.form.lastName.minLength">Слишком короткая фамилия!</span>
                  <span class="md-error" v-else-if="!$v.form.lastName.maxLength">Слишком большое имя!</span>
                </md-field>

                <md-field md-clearable :class="getValidationClass('login')">
                  <label for="login">Логин</label>
                  <md-input type="login" name="login" id="login" autocomplete="login" v-model="form.login" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.login.required">Введите логин!</span>
                  <span class="md-error" v-else-if="!$v.form.login.minLength || !$v.form.login.maxLength">Некорректный логин!</span>
                </md-field>

                <md-field :class="getValidationClass('password')">
                  <label for="password">Пароль</label>
                  <md-input type="password" name="password" id="password" autocomplete="new-password" v-model="form.password" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.password.required">Введите пароль!</span>
                  <span class="md-error" v-else-if="!$v.form.password.minLength">Придумайте более длинный пароль!</span>
                  <span class="md-error" v-else-if="!$v.form.password.maxLength">Придумайте более короткий пароль!</span>
                </md-field>

                <md-field :class="getValidationClass('repeat_password')">
                  <label for="repeat_password">Повторите пароль</label>
                  <md-input type="password" name="repeat_password" id="repeat_password" autocomplete="new-password" v-model="form.repeat_password" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.password.required">Повторите пароль!</span>
                  <span class="md-error" v-else-if="!$v.form.repeat_password.sameAs">Пароли не совпадают!</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-primary">Создать аккаунт</md-button>
          </md-card-actions>      
          <md-snackbar :md-active.sync="userSaved">Пользователь {{ lastUser }} успешно зарегестрирован! </md-snackbar>
        </md-card>
        <md-button to="/login" class="link">Уже зарегестрированы? Войти</md-button>
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
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'
const axios = require('axios')

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      login: null,
      password: null,
      repeat_password: null
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
      firstName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      lastName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      },
      login: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(30)
      },
      repeat_password: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.form.firstName = null,
      this.form.lastName = null,
      this.form.login  = null,
      this.form.password = null,
      this.form.repeat_password = null
    },
    saveUser() {
      this.sending = true    
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true,
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    checkForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendData()
      }
    },
    sendData() {
      axios({
        method: "post",
        data: {
          name: this.form.firstName,
          surname: this.form.lastName,
          login: this.form.login,
          password: this.form.password,
          repeat_password: this.form.repeat_password
        },
        url: "ajax/registrate.php",
        responseType: 'json'
      })
      .then(response => {
        if (response.data == 'Ok') {
          this.saveUser(),
          window.setTimeout(() => {
            this.$router.push('/login') 
          }, 1000) 
        } else {
          this.showError = true,
          this.textError = response.data
        }
      })
      .catch(e => {
        this.showError = true,
        this.textError = e
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
          this.textLoggedUser = 'Вы уже вошли в аккаунт'
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
#registerContent {
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