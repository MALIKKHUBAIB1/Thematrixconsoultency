import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // ✅ React plugin add kiya
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
