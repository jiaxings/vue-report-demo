// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

// let test = new Promise((resolve, reject) => {
//   console.log('c')
//   setTimeout(() => resolve('1'), 1000)
// })
console.log('r')
let test = Promise.resolve(1)
test.then((value) => {
  console.log('c1')
  return value + '2'
}).then((value) => {
  console.log('c2')
  return value + 3
}).then((value) => {
  console.log('c3')
  console.log(value)
})

Vue.http.get('/uaa/self').then(resp => {
  console.log('get user info: ' + resp.status)
  console.log('body: ' + JSON.stringify(resp.json()))
  Vue.http.get('/api/reports').then(resp => {
    console.log('get /api/reports: ' + resp.status)
    console.log('body: ' + JSON.stringify(resp.json()))
  }).catch(resp => {
    console.log('get /api/reports failed: ' + resp.status)
  })
}).catch(resp => {
  console.log('get user info failed: ' + resp.status)
  console.log('body: ' + resp.text())
})
