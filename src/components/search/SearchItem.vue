<template>
  <div id="card">

    <md-card>
      <md-card-header>
        <md-card-media>
          <img :src="book.picture">
        </md-card-media>

        <md-card-header-text>
          <div class="md-title">{{ book.name }}</div>
          <div class="md-subhead">{{ book.author }}</div>
        </md-card-header-text>  
      </md-card-header>

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
            <p v-if="book.price == 0"> Бесплатно </p>
            <p v-else> {{ book.price }} рублей</p>
            <a :href="book.url" target="_blank">Источник</a>
            <p>{{ book.description }}</p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>

  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    id: Number
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
.md-card-media {
  margin-top: 14px;
}
.md-card-header-text {
  margin-left: 10px;
}
.card-expansion {
  height: 280px;
}
.md-title {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>