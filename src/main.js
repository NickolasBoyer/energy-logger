import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import 'chartist/dist/chartist.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
