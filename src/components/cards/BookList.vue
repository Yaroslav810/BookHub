<template>
  <div id="BookList"> 
    <md-menu md-direction="bottom-end">
      <md-button class="menu" md-menu-trigger>
        <span v-if="isBook" class="md-subheading">Книги</span>
        <span v-else class="md-subheading">Статьи</span>
        <md-icon>keyboard_arrow_down</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item @click="isBook = true">Книги</md-menu-item>
        <md-menu-item @click="isBook = false">Статьи</md-menu-item>
      </md-menu-content>
    </md-menu>

    <div v-if="isBook">
      <LoaderSpinner v-if="sending" class="load" />
      <div v-else>
        <transition-group name="animate" appear>
          <BookItem v-for="book in books" :key="book" :book="book"></BookItem>
        </transition-group>
        <div class="loadContentBooks">
          <md-button class="md-raised" @click="loadContent()">Обновить рекомендации</md-button>
        </div> 
      </div>
    </div>
    <div v-else>
      <LoaderSpinner v-if="sending" class="load" />
      <div v-else>
        <div class="loadContentArticles">
          <md-button @click="loadContent()" class="md-icon-button" >
            <md-icon>cached</md-icon>
          </md-button>
        </div>
        <transition-group name="animate" appear>
          <ArticleItem v-for="article in articles" :key="article" :article="article"></ArticleItem>  
        </transition-group>
      </div>  
    </div>
    
    <md-snackbar :md-active.sync="showError">
      <span>Ошибка! {{ textError }} </span>
      <md-button class="md-icon-button" @click="showError = false">
        <md-icon class="md-accent">keyboard_arrow_down</md-icon>
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import BookItem from './BookItem'
import ArticleItem from './ArticleItem'
import LoaderSpinner from './../loader/loaderSpinner'
const axios = require('axios')

export default {
  el: '#BookList',
  data: () => ({
    books: [],
    articles: [],
    profileInfoUser: [],
    profileInfoArticles: [],
    isBook: true,
    sending: false,
    showError: false,
    textError: 'Не удалось загрузить данные',
    error: ''
  }),
  components: {
    BookItem,
    ArticleItem,
    LoaderSpinner
  },
  methods: {
    loadContent() {
      this.sending = true
      if (this.isBook) {  
        window.setTimeout(() => {
          this.books.push(this.getContentBooks())
          this.sending = false
        }, 1000)
      } else {       
        window.setTimeout(() => {
          this.articles.push(this.getContentArticles())
          this.sending = false
        }, 1000)
      }
    },
    getContentBooks() {
      axios
        .get('ajax/getBooks.php')
        .then(response => {
          this.books = response.data
        })
        .catch(e => {
          this.showError = true,
          this.error = e
        })
    },
    getContentArticles() {
      axios
        .get('ajax/getArticles.php')
        .then(response => {
          this.articles = response.data
        })
        .catch(e => {
          this.showError = true,
          this.error = e
        })
    }
  },
  created() {
    if (this.$route.fullPath === '/?go=articles') {
      this.isBook = false
    }
    this.sending = true
    window.setTimeout(() => {
      this.getContentBooks()
      this.getContentArticles()
      this.sending = false
    }, 800)
  },
  watch: {
    isBook(value) {
      if (!value) {
        if (this.$route.fullPath === '/') {
          this.$router.push({ query: { go: 'articles' } })
        }
      } else {
        this.$router.push({ name: 'index' })
      }
    }
  }
}
</script>

<style scoped>
.loadContentBooks, .load, .tab-article {
  text-align: center;
}
.loadContentArticles {
  text-align: right;
  margin-top: -40px;
}
.md-raised {
  margin: 20px auto;
}
.md-tabs {
  margin-bottom: 20px;
}
.menu {
  margin: 20px 0 0 20px;
}
.md-raised {
  margin-bottom: 24px;
}
.dialog {
  border: 1px solid red;
}
.md-dialog-content, .md-dialog-title, .md-dialog-actions {
  background-color: #ffffff;
  margin: 0;
}
.md-dialog-title {
  margin-bottom: 15px;
}
</style>