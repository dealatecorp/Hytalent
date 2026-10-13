import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createEnquiryHandler } from './server/enquiry.js';

export default defineConfig(({mode}) => ({
  plugins: [react(), {
    name: 'hytalent-enquiry',
    configureServer(server) { server.middlewares.use(createEnquiryHandler({env:{...process.env,...loadEnv(mode,process.cwd(),'')}})); },
    configurePreviewServer(server) { server.middlewares.use(createEnquiryHandler({env:{...process.env,...loadEnv(mode,process.cwd(),'')}})); },
  }],
}));
