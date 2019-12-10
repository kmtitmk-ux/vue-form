window.Vue = require('vue')
const moment = require("moment");
require('bootstrap-css-only')


//flatPickr
const flatPickr = require('vue-flatpickr-component')
require('flatpickr/dist/flatpickr.css')


//component
Vue.component('date-field', {
  props: ['todo'],
  template: `
  <div class="form-group col-12 mb-5">
    <label>{{ todo.date }}日目</label>
    <detail-field
      v-for="item in todo.detail"
      v-bind:detail="item"
      v-bind:key="item.id"
      v-bind:date="todo.date"
    ></detail-field>
    <div @click="add_route(todo)" class="text-center btn btn-info mt-4">ルートの追加</div>
  </div>`,
  methods: {
    add_route: function (todo) {
      key = todo.date - 1
      let new_id = app.route_input[key]['detail'].length
      app.route_input[key]['detail'].push({ id: new_id, time: '', place: '' })
    }
  }
})
Vue.component('detail-field', {
  props: ['date', 'detail'],
  template: `
  <div class="row mb-3 justify-content-between">
    <input class="form-control col-5" type="text" v-bind:value="detail.place" v-bind:name="set_name(date, detail, 'place')">
    <input class="form-control col-5" type="time" v-bind:value="detail.time" v-bind:name="set_name(date, detail, 'time')">
    <span class="btn btn-light col-1" @click="remove_route(detail, date)">削除</span>
  </div>
  `,
  methods: {
    set_name: function (date, detail, type) {
      return 'route[' + date + '][' + detail.id + '][' + type + ']'
    },
    remove_route: function (detail, date) {
      key = date - 1
      new_array = []
      let c = 0
      if (app.route_input[key]['detail'].length <= 1) {
        return;
      }
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


//インスタンス
const app = new Vue({
  el: '#app',
  data: {
    route_input: data_array,
    start: null,
    end: null,
    period: null,
    config: {
      minDate: "today"
    },
    date_error: "&nbsp"
  },
  components: {
    flatPickr
  },
  methods: {
    change_date: function (type, e) {

      if (type == 'start') {
        this.start = moment(e[0]).format("YYYY-MM-DD");
      } else {
        this.end = moment(e[0]).format("YYYY-MM-DD");
      }
      this.period = moment(this.end).diff(moment(this.start), 'days')

      //エラーの場合
      if (this.start && this.end) {

        if (this.period < 0) {
          this.date_error = '<span class="text-danger">正しい日付を選択してください。</span>'
          return;
        } else {
          this.date_error = "&nbsp"
        }

        //追加
        for (var i = 0; i <= this.period; i++) {
          if (this.route_input[i] === void 0) {
            this.route_input.push({
              date: i + 1,
              detail: [{
                id: 0,
                time: '',
                place: ''
              }]
            })
          }
        }

        //削除
        this.route_input.splice(this.period + 1)
      }
    }
  }
})