import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {aliases, mdi} from "vuetify/iconsets/mdi";
import {md3} from "vuetify/blueprints/md3";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            iconfont: 'mdi',
            aliases,
            sets:{
                mdi
            }
        },
        blueprint: md3,
    })
    nuxtApp.vueApp.use(vuetify);
})