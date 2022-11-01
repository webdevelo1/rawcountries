import DetailsPageVue from "pages/DetailsPage.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/IndexPage.vue") },
      { path: "/mylist", component: () => import("pages/MylistPage.vue") },
      {
        path: "/details",
        component: () => import("pages/DetailsPage.vue"),
        props: true,
      },
      { path: "/about", component: () => import("pages/AboutPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
