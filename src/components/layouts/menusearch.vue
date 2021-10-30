<template>
  <div>
    <md-toolbar class="md-transparent">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="showNavigation = true">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="main_header">
          <h2>BookHub</h2>
        </div>
      
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button search" to="/search">
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">B o o k H u b</span>
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

        <md-divider></md-divider>

        <md-list-item v-if="isLogged" @click="exit">
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Выход</span>
        </md-list-item>

        <md-list-item v-else to="/login">
          <md-icon>directions_walk</md-icon>
          <span class="md-list-item-text">Войти</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item href="https://www.google.com/url?q=https://www.google.com/intl/ALL_ru/covid19/%3Futm_source%3DGoogle%26utm_medium%3DHPP%26utm_campaign%3Dru&source=hpp&id=19017351&ct=3&usg=AFQjCNGhjXEzho8NaWYAYQHdtpIc7oNxTg&sa=X&ved=0ahUKEwiF0_n33__oAhWHjosKHfjSAU8Q8IcBCBA">
          <span class="covid">Коронавирус (COVID-19): актуальная информация</span>
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
    selectedEmployee: null,
    isLogged: 0
  }),
  methods: {
    exit() {
      axios.post('ajax/exit.php'),
      this.isLogged = 0
      if (this.$route.fullPath != '/') {
        this.$router.push('/')
      }
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
  }
}
</script>

<style scoped>
  .search_input {
    width: 70%;
    max-width: 560px;
    padding: 10px;
    outline: none;
    border: 1px solid #1E90FF;
    border-radius: 15px;
    background: #fafafa;
    transition: background 0.25s, box-shadow 0.25s;
    transition: 0.2s;
  }
  
  .search_input:focus {
    box-shadow: 0 0 22px #8CC6BA;
  }

  .search_input::placeholder {
    color: #8d8d8d;
    font-size: 14px;
  }
  
  .covid {
    font-size: 11px;
  }

  .hide_search {
    display: none;
  }

  .hide_menusearch {
    display: none;
  }

  .main_header {
    margin-right: 20px;
  }

  .isBlock {
    display: none;
  }
</style>