import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function servePortfolioAssets() {
  return {
    name: 'serve-portfolio-assets',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const decodedUrl = decodeURIComponent(req.url || '');
        if (decodedUrl.startsWith('/portfolio/assets/') || decodedUrl.startsWith('/asset/')) {
          const filename = decodedUrl.replace(/^\/(portfolio\/assets|asset)\//, '').split('?')[0];
          const filePath = path.resolve(__dirname, 'asset', filename);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            if (filename.endsWith('.glb')) {
              res.setHeader('Content-Type', 'model/gltf-binary');
            } else if (filename.endsWith('.pdf')) {
              res.setHeader('Content-Type', 'application/pdf');
            }
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        const targets = [
          path.resolve(distDir, 'portfolio', 'assets'),
          path.resolve(distDir, 'asset')
        ];
        for (const target of targets) {
          fs.mkdirSync(target, { recursive: true });
        }
        const srcDir = path.resolve(__dirname, 'asset');
        if (fs.existsSync(srcDir)) {
          const files = fs.readdirSync(srcDir);
          for (const file of files) {
            const srcFile = path.resolve(srcDir, file);
            if (fs.statSync(srcFile).isFile()) {
              for (const target of targets) {
                fs.copyFileSync(srcFile, path.resolve(target, file));
              }
            }
          }
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), servePortfolioAssets()],
  server: {
    port: 5173,
    host: true
  }
});
