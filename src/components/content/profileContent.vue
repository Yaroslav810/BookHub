<template>
  <div id="profileContent">
    <div v-if="isLogged" >
      <transition name="animateOpacity" appear>
        <md-card class="md-layout-item md-small-size-100">
          <md-card-header>
            <md-card-media>
              <md-avatar class="md-avatar-icon md-large">
                <md-ripple>{{ initials }}</md-ripple>
              </md-avatar>
            </md-card-media>
            <md-card-header-text>
              <div class="md-title"> {{ user.user_name }} {{ user.user_surname }} </div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
      </transition>
      
      <div v-if="haveArticles">
        <transition name="animateOpacity" appear>
          <div class="header_publication">
            <span class="md-display-1 header_publish">Публикации:</span>
            <md-button v-if="this.articles.length > 1" class="md-icon-button" @click="regularizeArticles()">
              <md-icon>seaswap_callsrch</md-icon>
            </md-button>        
          </div>
        </transition>

        <transition-group name="animate" appear>
          <ArticleItem v-for="article in articles" :key="article.article_id" :article="article"></ArticleItem>
        </transition-group>
        
      </div>
      <div v-else class="display">
        <transition name="animateOpacity" appear>
          <span class="md-display-1">{{ textNotPublish }}</span>
        </transition>
      </div>
    </div>
    <div v-else class="display">
      <transition name="animateOpacity" appear>
        <span class="md-display-3">{{ textNotLogged }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import ArticleItem from '../article/userArticleItem'
const axios = require('axios')

export default {
  data: () => ({
    user: {},
    articles: [],
    initials: '',
    isLogged: 0,
    textNotLogged: '',
    haveArticles: true,
    textNotPublish: ''
  }),
  components: {
    ArticleItem
  },
  methods: {
    regularizeArticles() {
      this.articles = this.articles.reverse()
    },
    isHaveArticles() {
      if (this.articles.length != 0) {
        this.haveArticles = true
      } else {
        this.haveArticles = false,
        this.textNotPublish = 'Нет публикаций'
      }
    },
    getUserInfo() {
      axios({
        method: "post",
        url: "ajax/getUserInfo.php"
      })
      .then(response => {
        this.user = response.data,
        this.articles = response.data['articles'],
        this.initials = this.user.user_name[0] + this.user.user_surname[0],
        this.isHaveArticles()
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
          this.getUserInfo()
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
#profileContent {
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
}
.md-card {
  padding-top: 10px;
}
.md-card-media {
  margin-top: 10px;
}
.md-title {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.display {
  margin-top: 20px;
  text-align: center;
}
.header_publication {
  display: flex;
  justify-content: space-between;
  margin: 25px 0 10px 0;
}
.header_publish {
  margin-left: 10px;
}
</style>