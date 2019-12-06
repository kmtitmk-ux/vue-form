
var moment = require("moment");
window.Vue = require('vue')

Vue.component('date-field', {
  props: ['todo'],
  template: `
  <div class="col-12 mb-3">
    <p>{{ todo.date }}日目</p>
    <detail-field
      v-for="item in todo.detail"
      v-bind:detail="item"
      v-bind:key="item.id"
      v-bind:date="todo.date"
    ></detail-field>
    <div class="row d-flex justify-content-around form-group">
      <div @click="add_route(todo)" class="btn btn-info col-2">ルートの追加</div>
    </div>
  </div>`,
  methods: {
    add_route: function (todo) {
      key = todo.date - 1
      var new_id = app.route_input[key]['detail'].length
      app.route_input[key]['detail'].push({ id: new_id, time: '', place: '' })
    }
  }
})

Vue.component('detail-field', {
  props: ['date', 'detail'],
  template: `
  <div class="row">
    <input type="text" v-bind:value="detail.place" v-bind:name="set_name(date, detail, 'place')">
    <input type="time" v-bind:value="detail.time" v-bind:name="set_name(date, detail, 'time')">
    <span @click="remove_route(detail, date)">削除</span>
  </div>
  `,
  methods: {
    set_name: function (date, detail, type) {
      return 'route[' + date + '][' + detail.id + '][' + type + ']'
    },
    remove_route: function (detail, date) {
      key = date - 1
      new_array = []
      var c = 0
      app.route_input[key]['detail'].forEach(function (element, i) {
        if (detail.id != i) {
          new_array[c] = {
            id: c,
            time: element['time'],
            place: element['place'],
          }
          c++
        }
      })
      app.route_input[key]['detail'] = new_array
    },
  }
})

var app = new Vue({
  el: '#app',
  data: {
    route_input: data_array,
    period: 1
  }
})





var test = new Vue({
  el: '#test',
  data: {
    start: moment().format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
    period: moment(1).format("DDDD")
  },
  methods: {
    start_change: function (e) {
      this.period = moment(this.end) - moment(e.target.value)
      this.period = moment(this.period).format("DDDD");
    },
    end_change: function (e) {
      this.period = moment(e.target.value) - moment(this.start)
      this.period = moment(this.period).format("DDDD");
    }
  }
})