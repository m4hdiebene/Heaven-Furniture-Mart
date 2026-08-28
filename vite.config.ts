import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

function ssgPlugin(): Plugin {
  return {
    name: 'hono-ssg-generate',
    apply: 'build',
    async closeBundle() {
      try {
        const workerPath = path.resolve('dist/_worker.js')
        const workerUrl = pathToFileURL(workerPath).href
        const module = await import(workerUrl)
        const app = module.default
        if (app && typeof app.request === 'function') {
          const res = await app.request('http://localhost/')
          if (res.ok) {
            const html = await res.text()
            await fs.writeFile(path.resolve('dist/index.html'), html, 'utf-8')
            console.log(`✓ [SSG] Generated dist/index.html (${(html.length / 1024).toFixed(1)} kB)`)
          } else {
            console.error(`[SSG] Failed to generate HTML: status ${res.status}`)
          }
        }
      } catch (err) {
        console.error('[SSG] Error generating index.html:', err)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    }),
    ssgPlugin()
  ]
})
