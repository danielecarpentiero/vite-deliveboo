<script>
import { RouterLink } from "vue-router";

export default {
  name: "successful",
};
</script>
<template>
  <div class="container success d-flex justify-content-center overflow-auto">
    <div
      class="d-flex flex-wrap p-2 justify-content-center mt-5 mb-5 gap-3 card"
      style="width: 500px"
    >
      <font-awesome-icon :icon="['far', 'circle-check']" class="icon my-3" />
      <div class="text-center rounded">
        Your order was successful,Thank you for ordering,you should be receiving
        a mail with a summary of your order.
      </div>
      <router-link
        :to="{ name: 'home', params: {} }"
        class="d-flex justify-content-center mt-3"
      >
        <button class="btn btn-secondary">Back to Home</button></router-link
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  font-size: 100px;
  color: green;
}

.success {
  min-height: 70vh;
}
</style>
