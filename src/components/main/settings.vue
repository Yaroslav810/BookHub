<template>
  <div>
    <Menu msg="Настройки" />
    <SettingsContent class="content" />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import SettingsContent from '@/components/content/settingsContent'

export default {
  components: {
    Menu,
    SettingsContent
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