import Vue from 'vue'
import VueFire from 'vuefire'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

Vue.use(VueFire)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  el: '#app',
  render: h => h(App)
})
