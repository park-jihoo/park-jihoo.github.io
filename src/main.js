import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from "./router/index.js";
import { md3 } from 'vuetify/blueprints';
import '@mdi/font/css/materialdesignicons.css';

// Code Block
import {CodeBlock} from "vue3-code-block";

// Vue3 Katex
import Vue3Katex from "@hsorby/vue3-katex";

const vuetify = createVuetify({
    blueprint: md3,
})

createApp(App)
    .use(router)
    .use(vuetify)
    .use(Vue3Katex)
    .component('CodeBlock', CodeBlock)
    .mount('#app')