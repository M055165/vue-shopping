import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/",
  },
  {
    name: "index",
    path: "/",
    component: () => import("../views/front_page/forntIndex.vue"),
    children:[
      {
        name: 'frontHome',
        path: '',
        component: () => import('../views/front_page/FrontHome.vue'),
      },
      {
        name: 'frontProduct',
        path: 'frontproduct',
        component: () => import('../views/front_page/Frontproduct.vue'),
      },
      {
        name: 'frontProductIn',
        path: 'frontproductIn',
        component: () => import('../views/front_page/FrontProductIn.vue'),
      },
      {
        name: 'frontCart',
        path: 'frontcart',
        component: () => import('../views/front_page/frontCart.vue'),
      },
      {
        name: 'OrderCheck',
        path: 'ordercheck',
        component: () => import('../views/front_page/OrderCheck.vue'),
      },
      {
        name: 'OrderPayment',
        path: 'orderpayment',
        component: () => import('../views/front_page/OrderPayment.vue'),
      },
      {
        name: 'PaymentSuccessful',
        path: 'paymentsuccessful',
        component: () => import('../views/front_page/PaymentSuccessful.vue'),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/back_page/Login.vue"),
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    component: () => import("../views/back_page/Dashboard.vue"),
    children: [
      {
        path: "Products",
        name: "Products",
        component: () => import('../views/back_page/Products.vue'),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        name: "Order",
        path: "Order",
        component: () => import("../views/back_page/Order.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "Cart",
        path: "Cart",
        component: () => import("../views/back_page/Cart.vue"),
      },
      
    ],
  },
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   component: () => import("../views/back_page/Dashboard.vue"),
  //   children: [
  //     {
  //       path: "customer_order",
  //       name: "CustomerOrder",
  //       component: () => import("../views/back_page/CustomerOrder.vue"),
        
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
