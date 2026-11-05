import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function servePortfolioAssets(): Plugin {
  return {
    name: 'serve-portfolio-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url || '');
        if (decodedUrl.startsWith('/portfolio/assets/') || decodedUrl.startsWith('/asset/')) {
          const filename = decodedUrl.replace(/^\/(portfolio\/assets|asset)\//, '').split('?')[0];
          const filePath = path.resolve(__dirname, 'asset', filename);
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
              const etag = `W/"${stat.size}-${Math.floor(stat.mtimeMs)}"`;
              if (req.headers['if-none-match'] === etag) {
                res.statusCode = 304;
                res.end();
                return;
              }

              if (filename.endsWith('.glb')) {
                res.setHeader('Content-Type', 'model/gltf-binary');
              } else if (filename.endsWith('.pdf')) {
                res.setHeader('Content-Type', 'application/pdf');
              }

              res.setHeader('ETag', etag);
              res.setHeader('Content-Length', stat.size);
              res.setHeader('Accept-Ranges', 'bytes');
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
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
