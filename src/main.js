import { createApp } from "vue";

import "./style.scss";

import * as bootstrap from "bootstrap";

import { router } from "./router.js";

import App from "./App.vue";

// Font Exo-2
import "@fontsource/exo-2";
import "@fontsource/exo-2/400.css";
import "@fontsource/exo-2/400-italic.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faFacebookF,
  faXTwitter,
  faInstagram,
  faApple,
  faGooglePlay,
  faCartShopping
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
