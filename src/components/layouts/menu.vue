<template>
  <div>
    <md-toolbar class="md-transparent">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h2>{{ msg }}</h2>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">BookHub</span>
      </md-toolbar>

      <md-list>
        <md-list-item to="/">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Лента</span>
        </md-list-item>

        <md-list-item v-if="isLogged" to="/addarticle">
          <md-icon>receipt</md-icon>
          <span class="md-list-item-text">Создать статью</span>
        </md-list-item>

        <md-list-item v-if="isLogged" to="/profile">
          <md-icon>account_circle</md-icon>
          <span class="md-list-item-text">Профиль</span>
        </md-list-item>

        <md-list-item v-if="isLogged" to="/subscriptions">
          <md-icon>supervisor_account</md-icon>
          <span class="md-list-item-text">Подписки</span>
        </md-list-item>

        <md-list-item v-if="isLogged" to="/choice">
          <md-icon>list_alt</md-icon>
          <span class="md-list-item-text">Выбор жанров</span>
        </md-list-item>

        <md-list-item v-if="isLogged" to="/settings">
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Настройки</span>
        </md-list-item>

        <md-list-item v-if="isLogged" @click="exit">
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Выход</span>
        </md-list-item>

        <md-list-item v-if="!isLogged" to="/login">
          <md-icon>directions_walk</md-icon>
          <span class="md-list-item-text">Войти</span>
        </md-list-item>

      </md-list>
    </md-drawer>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'Temporary',
  data: () => ({
    showNavigation: false,
    isLogged: 0
  }),
  methods: {
    exit() {
      axios
        .post('ajax/exit.php'),
      this.isLogged = 0,
      this.$router.push('/')  
    }
  },
  created() {
    axios({
      method: "post",
      url: "ajax/isLogged.php"
    }).then(response => {
      if (response.data == 1) {
        this.isLogged = 1
      } else {
        this.isLogged = 0
      }
    })
  },
  props: {
    msg: String
  }
}
</script>

<style>
  .md-list-item-text {
    font-size: 18px;
  }
</style>