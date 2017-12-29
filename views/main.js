import Vue from 'vue'
import VueResource from 'vue-resource'

import App from '../components/App'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  el: '#main',
  render: h => h(App)
})