window.Vue = require('vue');

Vue.component('input-field', {
  props: ['todo'],
  template: `
  <div class="route_count col-12 mb-3 row d-flex justify-content-between">
      <input class="col-3 form-control" type="time" :value="todo.time" :name="'route[' + todo.id + '][time]'">
      <input class="col-7 form-control" type="text" :value="todo.place" :name="'route[' + todo.id + '][place]'">
      <span @click="remove_route(todo.id)" class="btn btn-info col-1">削除</span>
  </div>`,
  methods: {
    remove_route: function (id) {
      new_array = [];
      var c = 0;
      if (app.route_input.length == 1) {
        return;
      }
      app.route_input.forEach(function (element, i) {
        if (id != i) {
          new_array[c] = {
            id: c,
            time: element['time'],
            place: element['place'],
          }
          c++;
        }
      })
      app.route_input = new_array
    }
  }
})
var app = new Vue({
  el: '#app',
  data: {
    route_input: data_array,
  },
  methods: {
    add_route: function () {
      var add = {
        id: this.route_input.length,
        time: '',
        place: ''
      }
      this.route_input.push(add)
    }
  }
})