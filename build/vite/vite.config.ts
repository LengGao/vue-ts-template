// @see: https://vitejs.dev/config/
import { ConfigEnv, UserConfig, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const { mode, command } = configEnv;
  const isProd = command === "build";
  const root = process.cwd();

  return {
    // 路径
    root: root,
    base: isProd ? "/" : "./",
    envDir: resolve(root, "env"),
    publicDir: resolve(root, "public"),
    cacheDir: resolve(root, "cache"),
    resolve: {
      alias: {
        "@": resolve(root, "src"),
        "~": resolve(root),
      },
    },
    //
    css: {},
    json: {},
    esbuild: {},
    optimizeDeps: {},
    plugins: [vue()],
    build: {
      rollupOptions: {},
    },
    mode: mode,
    server: {
      open: true,
      host: "0.0.0.0",
    },
    preview: {},
  };
});
