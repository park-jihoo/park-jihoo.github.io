import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/jihoo/githubio/park-jihoo.github.io/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}