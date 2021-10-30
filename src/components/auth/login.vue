<template>
  <div>
    <Menu msg="Вход" />
    <loginContent />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import loginContent from '@/components/content/loginContent'

export default {
  components: {
    Menu,
    loginContent
  }
}
</script>