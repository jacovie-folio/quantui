import react from '@vitejs/plugin-react'; // Example plugin
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    dts(), // Generates .d.ts files
    viteTsconfigPaths(), // Resolves tsconfig path aliases
  ],
  // Other Vite configurations...
});
