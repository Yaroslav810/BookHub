<template>
  <div id="proifile">
    <Menu msg = "Профиль"  />
    <profileContent class="content" />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import profileContent from '@/components/content/profileContent'

export default {
  components: {
    Menu,
    profileContent
  }
}
</script>

<style scoped>
.content {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fafafa !important;
}
</style>