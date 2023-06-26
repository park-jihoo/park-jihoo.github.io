import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from "./router/index.js";
import { md3 } from 'vuetify/blueprints';

// Code Block
import {CodeBlock} from "vue3-code-block";

const vuetify = createVuetify({
    blueprint: md3,
})

createApp(App).use(router).use(vuetify).component('CodeBlock', CodeBlock).mount('#app')