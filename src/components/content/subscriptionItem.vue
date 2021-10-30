<template>
  <div id="SubscriptionItem">
    <md-card>
      <md-card-header>
        <md-avatar class="md-avatar-icon md-small">
          <md-ripple>{{ subscribe.user_name[0] + subscribe.user_surname[0] }}</md-ripple>
        </md-avatar>
        <div @click="viewProfile" class="md-title"> {{ subscribe.user_name }} {{ subscribe.user_surname }} </div>
      </md-card-header>
    </md-card>   
  </div>
</template>

<script>
export default {
  props: {
    subscribe: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    viewProfile() {
      this.$router.push({ name: 'user', params: { id: this.subscribe.user_id }})
    }
  }
}
</script>

<style scoped>
#SubscriptionItem {
  width: 100%;
  max-width: 320px;
  margin: 3px auto;
  padding: 5px;
  background-color: #fafafa !important;
}
.md-title {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>