import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  publicDir: 'public',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src', 'lib') }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'lib', 'index.ts'),
      name: 'use-cursor-on-hover',
      formats: ['es', 'umd'],
      fileName: (format) => `use-cursor-on-hover.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
