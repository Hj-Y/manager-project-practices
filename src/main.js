import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//导入饿了么ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//导入axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;
//设置axios拦截器
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    //请求发送之前
    config.headers.Authorization=window.sessionStorage.getItem("token")
    return config;
  },
  function(error) {
    // 请求失败
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 响应返回的数据
    Vue.prototype.$message.success('请求数据成功');
    return response;
  },
  function(error) {
    //响应失败
    return Promise.reject(error);
  }
);
//导入路由
import router from "./router.js";
import "./assets/base.scss";

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
