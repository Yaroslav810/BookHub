<template>
  <div>
    <Menu msg="Регистрация" />
    <registerContent />
  </div>
</template>

<script>
import Menu from '@/components/layouts/menu'
import registerContent from '@/components/content/registerContent'

export default {
  components: {
    Menu,
    registerContent
  }
}
</script>