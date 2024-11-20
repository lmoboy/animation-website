// vite.config.js
import { defineConfig } from "file:///C:/laragon/www/animations/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/laragon/www/animations/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///C:/laragon/www/animations/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true
    }),
    react()
  ]
  // server: {
  //     host: '0.0.0.0',
  //     hmr: {
  //         host: '10.13.44.87'
  //     },
  //     watch: {
  //         usePolling: true,
  //     },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxhbmltYXRpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJjOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxhbmltYXRpb25zXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9jOi9sYXJhZ29uL3d3dy9hbmltYXRpb25zL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBsYXJhdmVsKHtcbiAgICAgICAgICAgIGlucHV0OiAncmVzb3VyY2VzL2pzL2FwcC5qc3gnLFxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHJlYWN0KCksXG4gICAgXSxcbiAgICAvLyBzZXJ2ZXI6IHtcbiAgICAvLyAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIC8vICAgICBobXI6IHtcbiAgICAvLyAgICAgICAgIGhvc3Q6ICcxMC4xMy40NC44NydcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgd2F0Y2g6IHtcbiAgICAvLyAgICAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLG9CQUFvQjtBQUNsUyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
