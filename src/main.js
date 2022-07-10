import Vue from "vue";
import "../public/css/styles.css";
import App from "./App.vue";
import directives from "./core/directives";

Vue.config.productionTip = false;

directives.register(Vue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
