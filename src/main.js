import { createApp } from "vue";

import "./style.scss";

import * as bootstrap from "bootstrap";

import { router } from "./router.js";

import App from "./App.vue";

createApp(App).use(router).mount("#app");
