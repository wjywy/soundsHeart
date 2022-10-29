import { defineConfig } from 'vite';
import createVitePlugins from './config/plugins';
export default defineConfig((configEnv) => {
  return {
 plugins: createVitePlugins(),
  };
});