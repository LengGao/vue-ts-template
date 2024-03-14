import 'nprogress/css/nprogress.css'; // 进度条样式
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuards } from './guards';
import { whiteNameList } from './constant';
import { basicRoutes } from './staticRoute';

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
});
/**
 * 重置路由
 */
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
/**
 * 挂载路由
 * @param app 
 */
export const setupRouter =  async (app: App) => {
  createRouterGuards(router, whiteNameList); // 创建路由守卫
  await router.isReady(); // 路由准备就绪后挂载APP实例
  app.use(router);
}

export default router;