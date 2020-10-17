import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/style-fix.scss";
import "./styles/common.scss";

import "vx-easyui/dist/themes/default/easyui.css";
import "vx-easyui/dist/themes/icon.css";
import "vx-easyui/dist/themes/vue.css";
import "./assets/fonts/css/font-awesome.min.css";

import EasyUI from "vx-easyui";
import locale from "vx-easyui/dist/locale/easyui-lang-zh_CN";
Vue.use(EasyUI, {
  locale: locale
});

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
