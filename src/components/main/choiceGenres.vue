<template>
  <div>
    <Menu msg="Выбор жанров" />
    <choiceGenresContent class="content" />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import choiceGenresContent from '@/components/content/choiceGenresContent'

export default {
  components: {
    Menu,
    choiceGenresContent
  }
}
</script>

<style scoped>
.content {
  background-color: #fafafa !important;
}
</style>