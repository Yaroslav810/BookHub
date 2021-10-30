<template>
  <div id="card">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{ book.name }}</div>
        <div class="md-subhead">{{ book.author }}</div>
      </md-card-header>
      <md-card-content class="card_content">
        <md-card-media>
          <img :src="book.picture">
        </md-card-media>
        <md-card-header-text>
          <div class="md-headline book_info">
            <div v-if="book.price == 0"> Бесплатно </div>
            <div v-else> {{ book.price }} ₽</div>
          </div>
          <md-divider></md-divider>
          <div class="md-subheading book_info">
            <a :href="book.url" target="_blank">Источник</a>
          </div>
        </md-card-header-text>
      </md-card-content>
      <md-card-expand>
        <md-card-actions md-alignment="right">
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>
        <md-card-expand-content>
          <md-card-content>   
            <p v-if="book.description == ''">Нет описания</p>
            <p v-else class="md-body-2"> {{ book.description }} </p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
#card {
  width: 100%;
  max-width: 320px;
  margin: 8px auto;
  padding: 5px;
  background-color: #fafafa !important;
}
.md-title, .md-subhead {
  overflow: hidden;
  text-overflow: ellipsis;
}
.card_content {
  display: flex;
  justify-content: space-between;
}
.md-card-media {
  max-width: 100px;
}
.md-card-header-text {
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 60%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.book_info {
  margin: 15px;
}
</style>