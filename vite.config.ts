import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: { host: "::", port: 8080, strictPort: true },
  preview: { host: "::", port: 8080, strictPort: true },
  build: { outDir: "dist" },
  // By default Vite scans every .html file in the project (including the
  // standalone applets in public/models/) to find dependencies to
  // pre-bundle. Restrict the scan to the actual app entry so it doesn't
  // trip over those files' own <script type="importmap"> module imports.
  optimizeDeps: { entries: ["index.html"] },
});
