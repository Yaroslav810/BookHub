<template>
  <div>
      <input type="text" class="search_input" placeholder="Поиск" ref="focusable" autoComplete="on" />
  </div>
</template>

<script>
export default {
  mounted() {
   this.$refs.focusable.$el.focus();
  }
}
</script>

<style scoped>
.search_input {
  padding: 10px;
  outline: none;
  border: 5px solid #1E90FF;
  border-radius: 10px;
  background: #fafafa;
  transition: background 0.25s, box-shadow 0.25s;
  transition: 0.2s;
}

</style>