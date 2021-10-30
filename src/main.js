import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import routes from '@/routes'
import axios from 'axios'
import store from './vuex/store.js'
import Vuelidate from 'vuelidate'



Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.config.productionTip = false
window.axios = axios
Vue.use(Vuelidate)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')