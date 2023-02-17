import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Confirmation from "../views/Confirmation.vue"
import Rejection from "../views/Rejection.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/booking/:name",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/booking/:name/:id",
    name: "Confirmation",
    component: Confirmation,
  },
  {
    path: "/rejection/:name/:id",
    name: "Rejection",
    component: Rejection,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
