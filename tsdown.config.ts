import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  external: ['vscode'],
  minify: true,
});
