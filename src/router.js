import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import index from "./components/index.vue";
import login from "./components/login.vue";
import users from "./components/users.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import goods from "./components/goods.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import params from "./components/params.vue";
import reports from "./components/reports.vue";

//路由规则
let routes = [
  { path: "/login", component: login },
  {
    path: "/",
    component: index,
    children: [
      { path: "users", component: users },
      { path: "roles", component: roles },
      { path: "rights", component: rights },
      { path: "goods", component: goods },
      { path: "categories", component: categories },
      { path: "orders", component: orders },
      { path: "params", component: params },
      { path: "reports", component: reports },
      //重定向
      { path: "", redirect: "users" },
    ]
  }
];
//路由创建
const router = new VueRouter({
  routes
});
//路由暴露
export default router;
