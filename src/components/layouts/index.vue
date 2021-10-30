<template>
  <div class="page-container md-layout-column" id="main">
    <MenuSearch />

    <md-content>
      <div class="container">
        <BookList></BookList>
      </div>
    </md-content>
  </div>
</template>

<script>
import MenuSearch from '@/components/layouts/menusearch.vue'
import BookList from '@/components/cards/BookList.vue'

export default {
  components: {
    MenuSearch,
    BookList
  }
}
</script>

<style scoped>
  /*.md-content {
    background-color: #F4F4F4 !important;
  }*/
</style>