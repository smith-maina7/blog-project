import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NewBlogView from "../components/NewBlog.vue";
import BlogBody from "../components/BlogBody.vue";
import SignInView from "../components/SignIn.vue";
import SignUpView from "../components/SignUp.vue";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/blog/:id",
    name: "blogbody",
    component: BlogBody,
    props: true,
  },
  {
    path: "/sign-in",
    name: "signin",
    component: SignInView,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next("/sign-in");
  } else {
    next();
  }
});
export default router;
