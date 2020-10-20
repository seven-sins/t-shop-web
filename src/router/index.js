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
        path: "/user",
        component: resove => require(["@/views/sys/user/User.vue"], resove)
      },
      {
        path: "/role",
        component: resove => require(["@/views/sys/role/Role.vue"], resove)
      },
      {
        path: "/menu",
        component: resove => require(["@/views/sys/menu/Menu.vue"], resove)
      },
      {
        path: "/theme",
        component: resove => require(["@/views/global/theme/Theme.vue"], resove)
      },
      {
        path: "/shop",
        component: resove => require(["@/views/global/shop/Shop.vue"], resove)
      },
      {
        path: "/category",
        component: resove => require(["@/views/global/goods/Category.vue"], resove)
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
