import Vue from "vue";
import VueRouter from "vue-router";
import Routes from "./routes";

Vue.use(VueRouter);

const routes =
  Routes &&
  Routes.map(item => ({
    path: item.path || `/${item.name}`,
    name: item.name,
    component: item,
    meta: {
      layout: item.layout,
      auth: item.auth,
      title: item.title,
      back: item.back
    }
  }));

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
