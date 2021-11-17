import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "@/components/Dashboard.vue";

Vue.use(VueRouter);

export default new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    { path: "/", component: Dashboard },
    { path: "/dashboard", component: Dashboard },
  ],
});
