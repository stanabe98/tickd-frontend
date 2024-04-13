import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your desired Vite development server port
    proxy: {
      "/api": {
        target: "https://127.0.0.1:7274",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
