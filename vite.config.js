import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [ vue({
    template:{transformAssetUrls},
  }
  ),
  vuetify({autoImport: true})
],
  server: {
    proxy: {
        '/api': {
            target: 'https://park-jihoo.github.io/Algorithm',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            secure: false,
          ws: true,
        }
    }
  }
})
