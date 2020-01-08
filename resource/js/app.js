window.Vue = require('vue')
require('bootstrap-css-only')
Vue.component('route-component', require('./components/RouteComponent.vue').default);

const app = new Vue({
  el: '#app',
})