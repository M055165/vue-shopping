import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import VueAwesomeSwiper from "vue-awesome-swiper";

import App from "./App.vue";
import router from "./router";
import "./bus";
import currencyFilter from "./filters/currency";
import date from "./filters/Date";
Vue.use(VueAxios, axios);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.filter("currency", currencyFilter);
Vue.filter("date", date);
Vue.component("Loading", Loading);
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `https://vue-course-api.herokuapp.com/ace0678/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});