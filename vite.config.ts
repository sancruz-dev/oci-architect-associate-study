import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' deixa o build funcionar em qualquer pasta ou hospedagem estática.
// O app usa HashRouter, então não precisa de configuração de servidor.
export default defineConfig({
  base: './',
  plugins: [react()],
});
