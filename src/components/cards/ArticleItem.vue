<template>
  <div id="articleItem">
    <md-card>
      <md-card-header>
        <md-avatar class="md-avatar-icon md-small">
          <md-ripple>{{ article.author_name[0] + article.author_surname[0] }}</md-ripple>
        </md-avatar>
        <div @click="viewProfile" class="md-title">{{ article.author_name }} {{ article.author_surname }}</div>
      </md-card-header>
      <md-content>
        <md-card-header-text>
          <div class="md-title">{{ article.title }}</div>
        </md-card-header-text>
      </md-content>
      <md-card-expand>
        <md-card-actions md-alignment="right">
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>
        <md-card-expand-content>
          <md-card-content>
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
  },
  methods: {
    viewProfile() {
      this.$router.push({ name: 'user', params: { id: this.article.author_id }})
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
.md-card-content {
  padding: 0 16px 20px 16px;
}
.md-body-2 {
  margin: 0 auto;
}
.md-content {
  margin: 0 10px;
}
</style>