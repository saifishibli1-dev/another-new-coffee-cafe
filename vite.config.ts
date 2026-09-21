import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  return {
    name: 'video-uploader',
    configureServer(server) {
      server.middlewares.use('/api/upload-hero-video', (req, res) => {
        if (req.method === 'POST') {
          const chunks: any[] = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const targetPath = path.resolve(__dirname, 'public/coffee_hero_scroll_web.mp4');
              fs.writeFileSync(targetPath, buffer);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, size: buffer.length }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Failed to save video' }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end('Method Not Allowed');
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
