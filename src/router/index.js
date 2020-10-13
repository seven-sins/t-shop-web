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
        component: resove => require(["@/components/user/User.vue"], resove)
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
