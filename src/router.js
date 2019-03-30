import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import index from "./components/index.vue";
import login from "./components/login.vue";
//路由规则
let routes = [
  { path: "/login", component: login },
  { path: "/", component: index }
];
//路由创建
const router = new VueRouter({
    routes   
})
//路由暴露
export default router;