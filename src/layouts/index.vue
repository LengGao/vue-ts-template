<script setup lang="tsx">
defineOptions({ name: "LayoutParentView" });
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <Suspense>
            <component :is="Component" />
            <template #fallback> </template>
          </Suspense>
        </transition>
      </template>
    </router-view>
  </div>
</template>