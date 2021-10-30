<template>
  <div id="articleItem">
    <md-card>
      <md-card-content class="header">
        <md-card-header-text>
          <div class="md-title">{{ article.title }}</div>
        </md-card-header-text>
      </md-card-content>
      <md-card-expand>
        <md-card-actions md-alignment="right">
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>
        <md-card-expand-content>
          <md-card-content class="text">
            <p class="md-body-2">{{ article.text }}</p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
#articleItem {
  width: 100%;
  max-width: 320px;
  margin: 3px auto;
  padding: 5px;
  background-color: #fafafa !important;
}
.md-title, .md-body-2 {
  overflow: hidden;
  text-overflow: ellipsis;
}
.md-content {
  margin: 10px;
}
.header {
  padding: 16px 16px 0 16px;
}
.text {
  padding: 0 16px 16px 16px;
}
.md-body-2 {
  margin: 0 auto;
}
.md-card {
  margin-top: 10px;
}
</style>