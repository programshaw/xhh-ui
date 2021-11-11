import Vue from 'vue'
import App from './App.vue'
import XhhUI from '../packages'

Vue.use(XhhUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
