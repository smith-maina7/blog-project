import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NewBlogView from "../components/NewBlog.vue";
import BlogBody from "../components/BlogBody.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/newblog",
    name: "newblog",
    component: NewBlogView,
  },
  {
    path: "/blog/:id",
    name: "blogbody",
    component: BlogBody,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
