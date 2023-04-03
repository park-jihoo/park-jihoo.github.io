import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from "./router/index.js";

const vuetify = createVuetify()

// VNetworkGraph
import VNetworkGraph from 'v-network-graph'

createApp(App).use(router).use(vuetify).use(VNetworkGraph).mount('#app')