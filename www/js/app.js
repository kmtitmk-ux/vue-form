window.Vue = require('vue');

Vue.component('input-field', {
    props: ['todo'],
    template: `
    <div class="route_count col-12 mb-3 row d-flex justify-content-between">
        <input class="col-3 form-control" type="time" :value="todo.time" :name="'route[' + todo.id + '][time]'">
        <input class="col-8 form-control" type="text" :value="todo.place" :name="'route[' + todo.id + '][place]'">
    </div>`
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