import { createApp } from "vue";
import { setupRouter } from '@/routers/index'
import { setupStores } from '@/stores/index'
import App from "./App.vue";

const app = createApp(App);

/**
 * 加载App同时控制过程
 */
const mount = async () => {
  await setupRouter(app); // 设置路由
  await setupStores(app); // 设置数据仓库

  app.mount("#app"); // 挂在应用
}
mount();