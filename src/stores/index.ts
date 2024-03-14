import type { App } from 'vue';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

export const setupStores = async (app: App, isPersistence: boolean = false) => {
  if (isPersistence) {
    pinia.use(piniaPluginPersistedstate);
  }
  app.use(pinia);
}

export default pinia;
