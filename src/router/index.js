import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/about",
        component: resove => require(["@/views/About.vue"], resove)
      },
      {
        path: "/user",
        component: resove => require(["@/views/user/User.vue"], resove)
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});
// 修复重复点击某个路由控制台报错问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;
