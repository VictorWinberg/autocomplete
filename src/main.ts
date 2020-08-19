import Vue, { VNode } from "vue";

import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import "@/assets/scss/style.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h): VNode => h(App)
}).$mount("#app");
