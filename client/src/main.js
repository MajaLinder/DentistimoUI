import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import UUID from 'vue-uuid' 
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import connector from "../mqttClient/connector";
import { BForm } from 'bootstrap-vue'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(UUID);  
Vue.component('b-form', BForm);

const connect = new connector();

connect.establishConnection();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
