// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import './permission'
import '@/common/styles/index.scss'
import customButton from "@/components/customButton/index.js"
import btn from "@/common/utils/btn";
import Print from 'vue-print-nb';
Vue.use(Print);
Vue.use(customButton);
Vue.prototype.btn = btn;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

import MyUpload from "@/components/AESfile/myUpload.vue";
import hasBtnPermission from '@/directive/hasBtnPermission'
Vue.component(MyUpload.name, MyUpload);
Vue.use(hasBtnPermission);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
