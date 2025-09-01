import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '^/api':     { target: 'http://localhost:8080', changeOrigin: true },
      '^/uploads': { target: 'http://localhost:8080', changeOrigin: true },
      '^/search':  { target: 'http://localhost:8080', changeOrigin: true },
    },
  },

  
  //setup for local newtwork
  // server: {
  //   host: '0.0.0.0', // Allow access from the local network
  //   port: 3000, // (Optional) Set the port if needed
  //   proxy: {
  //     '/api': 'http://10.0.0.192:8080',  // Proxy API requests to the backend
  //   },
  // },
 

})
