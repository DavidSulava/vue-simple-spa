import {defineConfig} from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
    plugins: [
        vue2({
            jsx: true,
        }),
        Components({
            resolvers: [VuetifyResolver()],
        })
    ],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: '/vue-simple-spa/'
})