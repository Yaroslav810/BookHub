<template>
  <div id="search">
    <md-toolbar>
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="goBack">
            <md-icon>arrow_back</md-icon>
          </md-button>
          <md-field class="search_field" md-inline md-clearable>
            <label>Поиск книг...</label>
            <md-input class="search_input" v-model="search" v-on:keyup.enter="submit()" autofocus></md-input>
          </md-field>            
        </div>
      </div>

      <div v-if="openExample">
        <p>Примеры запросов:</p>
        <ul class="list_example">
          <li v-for="example in examples" :key="example" @click="example_in_input(example)">
            <md-icon class="icon_example">search</md-icon>
            <span class="example"> {{ example }} </span>
          </li>
        </ul>
      </div>
    </md-toolbar>

    <LoaderSpinner v-if="sending" class="load" />
    <div v-else>
      <transition-group name="animate" appear>
        <BookItem v-for="book in books" :key="book" :book="book"> </BookItem>
      </transition-group>
    </div>

    <md-snackbar :md-active.sync="showError">
      <span> {{ textError }} </span>
      <md-button class="md-icon-button" @click="showError = false">
        <md-icon class="md-accent">keyboard_arrow_down</md-icon>
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import BookItem from './../cards/BookItem'
import LoaderSpinner from './../loader/loaderSpinner'
const axios = require('axios')

export default {
  data: () => ({
    books: [{
      "name":"Дети разума",
      "author":"Орсон Скотт Кард",
      "price":"249",
      "url":"https://www.litres.ru/orson-skott-kard/deti-razuma/",
      "picture":"https://cv3.litres.ru/pub/c/cover/123832.jpg",
      "description":" Большая игра Эндера близится к своему завершению. Но прежде, чем выйти из нее, Эндрю Виггину предстоит выдержать еще немало испытаний. Карательный флот по-прежнему стремится уничтожить мятежную Лузитанию. Вирус десколады успешно преодолевает любые попытки взять его под контроль. Совет Ста Миров санкционировал убийство Джейн, близкого друга Эндера Виггина, и хотя это не так-то просто сделать, дни ее сочтены. Да и время самого Эндера тоже утекает, как песок сквозь пальцы… \n Казалось бы, на столь мрачном фоне не остается места надежде на лучшее будущее. Но пока живо разумное начало, дарующее смысл и форму всему во Вселенной, игра будет продолжаться. \n",
      "category_id":"35100",
      "book_id":"1501"
    },
    {
      "name":"Ограниченный конфликт",
      "author":"Андрей Максимушкин",
      "price":"60",
      "url":"https://www.litres.ru/andrey-maksimushkin/ogranichennyy-konflikt/",
      "picture":"https://cv4.litres.ru/pub/c/cover/162349.jpg",
      "description":" Человечество меняется, но люди – нет, психология индивида неизменна со времен первобытных охотников за мамонтами. XXV век, по-прежнему земная цивилизация разделена на военно-политические блоки, по-прежнему регулярно вспыхивают конфликты. Только теперь спор идет не за кусочек земли, а за целые планетарные системы. Единственное, незыблем закон: против Чужих Человечество должно выступать единым фронтом. Но и это правило не обходится без исключений. Герои книги и не подозревают, во что выльется очередная блицвойна, конфликт с ограниченными целями. \n",
      "category_id":"37300",
      "book_id":"8320"
    }],
    search: '',
    examples: ['Война и Мир', 'Пушкин', 'А зори здесь тихие'],
    openExample: true,
    sending: false,
    showError: false,
    textError: '',
    error: ''
  }),
  components: {
    BookItem,
    LoaderSpinner
  },
  methods: {
    getResultSearch() {
      this.sending = true,
      window.setTimeout(() => {
        axios({
          method: "post",
          data: {
            request: this.search
          },
          url: "ajax/search.php",
          responseType: 'json'
        })
        .then(response => {
          if (response.data.length == 0) {
            this.textError = 'Ничего не найдено',
            this.showError = true,
            this.books = [],
            this.sending = false       
          } else {
            this.books = response.data,
            this.sending = false,
            this.$forceUpdate()
          }
        })
        .catch(e => {
          this.showError = true,
          this.textError = e
        })
      }, 1500)
    },
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      if (this.search === '') {
        this.textError = 'Задан пустой поисковый запрос',
        this.showError = true
      } else {
        this.openExample = false,
        this.getResultSearch()
      }
    },
    example_in_input(example) {
      this.search = example,
      this.openExample = false,
      this.submit()      
    },

  }
}
</script>

<style scoped>
#search {
  height: 100vh;
}
.back_icon {
  position: absolute;
  top: 10px;
  left: 10px;
}
.search_field {
  margin-right: 5px;
  margin-top: -1px;
  margin-left: 2px;
  outline: none;
}
.search_input {
  overflow: auto;
}
.icon_example {
  width: 5px;
  height: 5px;
}
.list_example {
  list-style-type: none;
  font-size: 15px;
}
.example {
  margin-left: 10px;
  line-height: 2;
}
.md-progress-bar {
  position: absolute;
  top: 2px;
  right: 0;
  left: 0;
}
.load {
  text-align: center; 
  margin-top: 15px;
}
</style>
