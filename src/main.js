import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import  'lib-flexible/flexible.js';
import '../src/assets/css/iconfont.css';
import '../src/assets/css/iconfonts.css';
import '../src/assets/css/font.css';
import '../src/assets/css/base.css';
import common from '../src/assets/js/common';
import project from '../src/assets/js/project';
Vue.prototype.$imgUrl='https://msjt.jxsxkeji.com/';
Vue.prototype.$common=common;
Vue.prototype.$project=project;
Vue.config.productionTip = false
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

