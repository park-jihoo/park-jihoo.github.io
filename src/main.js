import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from "./router/index.js";

const vuetify = createVuetify()

createApp(App).use(router).use(vuetify).mount('#app')