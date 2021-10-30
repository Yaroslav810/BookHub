<template>
  <div id="subscriptions">
    <Menu msg = "Подписки"  />
    <subscriptionsContent class="content" />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import subscriptionsContent from '@/components/content/subscriptionsContent'

export default {
  components: {
    Menu,
    subscriptionsContent
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