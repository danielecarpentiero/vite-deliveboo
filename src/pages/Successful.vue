<script>
import { RouterLink } from "vue-router";

export default {
  name: "successful",
};
</script>
<template>
  <div class="success d-flex justify-content-center overflow-auto pages">
    <div class="custom-shape-divider-top-1710498412">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
    <div
      class="d-flex flex-wrap p-2 justify-content-center flex-column mt-5 mb-5 gap-3 container"
    >
      <h1 class="display-1 text-white text-center mb-4">
        Your order has been sent
      </h1>
      <font-awesome-icon
        :icon="['far', 'circle-check']"
        class="icon my-3 text-white"
      />
      <!-- <h3 class="text-center rounded p-5 text-white">
        Thank you for ordering,you should be receiving a mail with a summary of
        your order.
      </h3> -->
      <router-link
        :to="{ name: 'home', params: {} }"
        class="d-flex justify-content-center link-underline link-underline-opacity-0 mt-3"
      >
        <button class="btn btn-white">Back to Home</button></router-link
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

.pages {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 99;
  background-color: #7ec884;
  top: 0;
  right: 0;
  left: 0;

  .custom-shape-divider-top-1710498412 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-top-1710498412 svg {
    position: relative;
    display: block;
    width: calc(158% + 1.3px);
    height: 90%;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-top-1710498412 .shape-fill {
    fill: #ffffff;
  }

  button {
    border-radius: 16px;
    border: 1px solid white;
    color: white;

    &:hover {
      background-color: white;
      color: #7ec884;
    }
  }
}
@media screen and (max-width: 576px) {
  .pages{
    position: static;
  }
}
</style>
