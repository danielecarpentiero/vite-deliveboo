<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    AppHeader,
    RouterView,
    AppFooter,
  },
};
</script>

<template>
  <div class="content">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.content {
  // overflow-x: hidden;
}
</style>
