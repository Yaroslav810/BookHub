<template>
  <transition name="animate" appear>
    <div id="profileInfo">
      <md-toolbar>
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="goBack">
              <md-icon>arrow_back</md-icon>
            </md-button>  
            <h2> {{ userInfo.user_login }} </h2>        
          </div>
        </div>
      </md-toolbar>

      <md-snackbar :md-active.sync="showError">
        <span> {{ textError }} </span>
        <md-button class="md-icon-button" @click="showError = false">
          <md-icon class="md-accent">keyboard_arrow_down</md-icon>
        </md-button>
      </md-snackbar>

      <md-card class="md-layout-item md-small-size-100">
        <md-card-header>
          <md-card-media>
            <md-avatar class="md-avatar-icon md-large">
              <md-ripple>{{ initials }}</md-ripple>
            </md-avatar>
          </md-card-media>

          <md-card-header-text>
            <div class="md-title"> {{ userInfo.user_name }} {{ userInfo.user_surname }} </div>

            <div v-if="isLogged && !isCurrent && !isSubscribe" class="subscribe_button">
              <md-button class="md-primary" @click="subscribe()">Подписаться</md-button>
            </div>
            <div v-if="isLogged && !isCurrent && isSubscribe" class="subscribe_button">
              <md-button @click="confirmation = true">Вы подписаны</md-button>
            </div>
            <p v-else-if="!isLogged">Зарегестрируйтесь, чтобы использовать ещё больше функций</p>

          </md-card-header-text>
        </md-card-header>
      </md-card>

      <ArticleItemUser v-for="article in userInfoArticles" :key="article" :article="article"></ArticleItemUser>

      <div>
        <md-dialog-confirm
          :md-active.sync="confirmation"
          md-title="Отказаться от подписки?"
          md-confirm-text="Отказаться"
          md-cancel-text="Отмена"
          @md-cancel="onCancel"
          @md-confirm="unsubscribe" />
      </div>
    </div>
  </transition>
</template>

<script>
const axios = require('axios');
import ArticleItemUser from './../article/userArticleItem'

export default {
  data: () => ({
    userInfo: [],
    userInfoArticles: [],
    initials: '',
    error: '',
    confirmation: false,
    isLogged: '',
    isCurrent: false,
    currentId: 0,
    isSubscribe: false,
    showError: false,
    textError: '',
  }),
  methods: {
    viewProfile(id) {
      axios({
        method: "post",
        data: {
          id: id
        },
        url: "./../ajax/getProfileInfo.php",
        responseType: 'json'
      }).then(response => {
        this.userInfo = response.data,
        this.userInfoArticles = response.data['articles'],
        this.initials = this.userInfo.user_name[0] + this.userInfo.user_surname[0]
      })
    },
    isLoggedUser() {
      axios({
        method: "post",
        url: "./../ajax/isLogged.php"
      }).then(response => {
        if (response.data == 1) {
          this.isLogged = 1
        } else {
          this.isLogged = 0
        }
      })
    },
    isCurrentUser(id) {
      axios({
        method: "post",
        data: {
          id: id
        },
        url: "./../ajax/isCurrentUser.php",
        responseType: 'json'
      }).then(response => {
        if (response.data) {
          this.isCurrent = true
        } else {
          this.isCurrent = false
        }
      })
    },
    goBack() {
      this.$router.go(-1);
    },
    subscribe() {
      axios({
        method: "post",
        data: {
          subscribed_id: this.currentId
        },
        url: "./../ajax/subscribe.php",
        responseType: 'json'
      })
      .catch(e => {
        this.showError = true,
        this.textError = e
      }),
      this.showError = true,
      this.textError = 'Подписка оформлена.'
      this.isSubscribe = true
    },
    onCancel() {
      this.confirmation = false
    },
    unsubscribe() {
      axios({
        method: "post",
        data: {
          subscribed_id: this.currentId
        },
        url: "./../ajax/unsubscribe.php",
        responseType: 'json'
      }).catch(e => {
        this.showError = true,
        this.textError = e
      }),
      this.showError = true,
      this.textError = 'Подписка отменена.'
      this.isSubscribe = false
    },
    isSubscribeUser(id) {
      axios({
        method: "post",
        data: {
          subscribed_id: id
        },
        url: "./../ajax/isSubscribed.php",
        responseType: 'json'
      }).then(response => {
        if (response.data) {
          this.isSubscribe = true
        } else {
          this.isSubscribe = false
        }
      })
    }
  },
  created() {
    var userId = this.$route.params.id
    this.currentId = userId
    this.viewProfile(userId)
    this.isLoggedUser()
    this.isCurrentUser(userId)
    this.isSubscribeUser(userId)
  },
  components: {
    ArticleItemUser
  }
}
</script>

<style scoped>
.md-card {
  padding-top: 10px;
}
.md-title {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.subscribe_button {
  margin-top: 10px;
}
</style>

<style>
.md-dialog {
  bottom: auto !important;
  align-items: normal !important;
}
</style>