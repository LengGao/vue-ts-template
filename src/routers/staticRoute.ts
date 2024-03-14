import type { RouteRecordRaw } from "vue-router";
import RouterView from "@/layouts/index.vue";
import * as CONSTANT from "./constant";

/**
 * 首页路由
 */
export const HomeRoute: RouteRecordRaw = {
  path: "/",
  name: "Home",
  redirect: "/dashboard/welcome",
  component: () => import("@/views/Home/index.vue"),
  meta: {
    title: CONSTANT.HOME_NAME,
  },
  children: [],
};

/**
 * 重定向路由 主要用于刷新当前页面
 */
export const redirectRoute: RouteRecordRaw = {
  path: "/redirect",
  name: "Redirect",
  component: RouterView,
  meta: {
    title: CONSTANT.REDIRECT_NAME,
  },
  children: [],
};

/**
 * 异常处理路由
 */
export const errorRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "PageNotFound",
  component: RouterView,
  meta: {
    title: CONSTANT.PAGE_NOT_FOUND_NAME,
  },
  children: [],
};

/**
 * 账号路由
 */
export const AccountRoute: RouteRecordRaw[] = [
  {
    path: "/accountRoute",
    name: "Account",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: CONSTANT.LOGIN_NAME,
    },
    children: []
  },
];

/**
 * 基础路由
 */
export const basicRoutes: RouteRecordRaw[] = [
  HomeRoute,
  redirectRoute,
  errorRoute,
  ...AccountRoute,
];
