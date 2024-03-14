import NProgress from "nprogress";
import type { Router, RouteLocationNormalized } from "vue-router";
import { NavigationGuardNext, NavigationFailureType, isNavigationFailure } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { Storage } from "@/utils/Storage";
import type { WhiteNameList } from "./constant";
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from "./constant";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
  ) {
  const defaultRoutePath = "/dashboard/welcome";
  const keepAliveStore = useKeepAliveStore();
  const userStore = useUserStore();
  const token = Storage.get(ACCESS_TOKEN_KEY, null);

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized) => {
    const comp = route.matched.at(-1)?.components?.default;
    return comp?.name ?? (comp as any)?.type?.name;
  };
  
  /** 重置流程 */
  const toLogin = (next: NavigationGuardNext) => {
    userStore.resetToken();
    next({ name: LOGIN_NAME });
  }

  /** 全局前置守卫 */
  router.beforeEach(async (to, _, next) => {
    NProgress.start(); // start progress bar
    const hasRoute = router.hasRoute(to.name!);
    const inWhiteNameList = whiteNameList.some((n) => n === to.name);

    if (token) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath });
      } else if (userStore.menus.length === 0) {
        // token有效则有菜单
        const res = await userStore.afterLogin();
        res ? next() : toLogin(next);
      } else if (to.name === PAGE_NOT_FOUND_NAME) {
        // 解决警告：No match found for location with path "XXXXXXX"
        next({ path: to.fullPath, replace: true });
      } else if (!hasRoute) {
        // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
        next({ ...to, replace: true });
      } else {
        next();
      }
    } else if (inWhiteNameList) {
      next();
    } else {
      next({ name: LOGIN_NAME, query: { redirect: to.fullPath }, replace: true });
    }
  });

  /** 全局后置路由 */
  router.afterEach((to, from, failure) => {
    // 在这里设置需要缓存的组件名称
    const toCompName = getComponentName(to);
    const fromCompName = getComponentName(from);

    // 跳过自己手动取消路由导航时的错误
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
      console.error('failed navigation', failure);
      return NProgress.done();
    }

    // 如果用户已登出，则清空所有缓存的组件
    if (!token) {
      keepAliveStore.clear();
    } else if (to.name === REDIRECT_NAME) {
      // 如果进入的是 Redirect 页面，则也将离开页面的缓存清空(刷新页面的操作)
      fromCompName && keepAliveStore.remove(fromCompName);
    } else if (to.meta?.keepAlive && toCompName) {
      // 判断当前页面是否开启缓存，如果开启，则将当前页面的 componentName 信息存入 keep-alive 全局状态
      keepAliveStore.add(toCompName);
    } else if (toCompName) {
      keepAliveStore.remove(toCompName);
    } else {
      console.warn(`${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`);
    }

    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.error("路由错误", error);
  });

  return router;
}
