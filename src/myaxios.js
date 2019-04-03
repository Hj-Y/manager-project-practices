
//导入Vue
import axios from "axios";
import router from "./router";

export default {
  install(Vue) {
    //导入axios
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
    Vue.prototype.$axios = axios;
    //设置axios拦截器
    // Add a request interceptor
    axios.interceptors.request.use(
      function(config) {
        //请求发送之前
        config.headers.Authorization = window.sessionStorage.getItem("token");
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

        
        if (response.data.meta.msg==='无效token'&&response.data.meta.status===400) {
            //伪造的token
            Vue.prototype.$message.warning('伪造的token搞我,牛逼 !' )
            //删除
            window.sessionStorage.removeItem('token')
            //回滚登录页
            router.push('/login')
            return;
            
        }
        // 响应返回的数据
        if (["200", "201", "204"].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg);
        } else {
          Vue.prototype.$message.warning(response.data.meta.msg);
        }
        return response;
      },
      function(error) {
        //响应失败
        return Promise.reject(error);
      }
    );
  }
};
