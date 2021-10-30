<template>
  <div id="subscriptionsContent">
    <div v-if="isLogged">
      <div v-if="this.subscribes.length == 0" class="display">
        <transition name="animateOpacity" appear>
          <span class="md-display-1">Список подписок пуст</span>
        </transition>
      </div>
      <div v-else>
        <transition-group name="animate" appear>
          <SubscriptionItem v-for="subscribe in subscribes" :key="subscribe" :subscribe="subscribe"></SubscriptionItem>
        </transition-group>
      </div>
    </div>
    <div v-else class="display">
      <transition name="animateOpacity" appear>
        <span class="md-display-3">{{ textNotLogged }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import SubscriptionItem from './subscriptionItem'
const axios = require('axios')

export default {
  data: () => ({
    isLogged: 0,
    subscribes: {},
    textNotLogged: ''
  }),
  components: {
    SubscriptionItem
  },
  methods: {
    getSubscriptions() {
      axios({
        method: "post",
        url: "ajax/getSubscriptions.php"
      })
      .then(response => {
        this.subscribes = response.data
      })
    },
    isLoggedUser() {
      axios({
        method: "post",
        url: "ajax/isLogged.php"
      })
      .then(response => {
        if (response.data == 1) {
          this.isLogged = 1,
          this.getSubscriptions()
        } else {
          this.isLogged = 0,
          this.textNotLogged = 'Войдите в аккаунт'
        }
      })
    }
  },
  created() {
    this.isLoggedUser()
  }
}
</script>

<style scoped>
.display {
  text-align: center;
  margin-top: 50px;
}
</style>