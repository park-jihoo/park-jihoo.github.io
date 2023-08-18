import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import router from "./router/index.js";
import { md3 } from "vuetify/blueprints";
import "@mdi/font/css/materialdesignicons.css";

// Code Block
import { CodeBlock } from "vue3-code-block";

// Vue3 Katex
import Vue3Katex from "@hsorby/vue3-katex";

import LazyComponent from "v-lazy-component";

const vuetify = createVuetify({
  blueprint: md3,
  defaults: {
    global: {
      ripple: true,
    },
  },
  theme: {
    defaultTheme: "light",
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(Vue3Katex)
  .use(LazyComponent)
  .component("CodeBlock", CodeBlock)
  .mount("#app");
