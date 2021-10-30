<template>
  <div id="add">
    <Menu msg = "Добавить статью"  />
    <addArticleContent class="content" />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import addArticleContent from '@/components/content/addArticleContent'

export default {
  components: {
    Menu,
    addArticleContent
  }
}
</script>

<style scoped>

</style>

<style scoped>
.content {
  background-color: #fafafa !important;
}
</style>