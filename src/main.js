import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

//导入饿了么ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//导入axios插件
import myaxios from './myaxios.js'
Vue.use(myaxios)
//导入路由
import router from "./router.js";
import "./assets/base.scss";
//面包屑导航组件
import breadcrumb from './components/breadcrumb.vue';
Vue.component('breadcrumb', breadcrumb)
//导入echarts

//全局过滤器
//导入moment插件
import moment from 'moment'
Vue.filter('formatTime', (value,formation)=>{
  return moment(value).format(formation)
})

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
