import basicSsl from '@vitejs/plugin-basic-ssl'
import { build } from 'vite'

export default {
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                orbit: 'orbit.html',
                ar: 'ar.html',
                list: 'list.html'
            }
        }
    },
    plugins: [
        basicSsl()
    ]
}