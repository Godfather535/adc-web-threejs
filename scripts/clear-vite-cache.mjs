import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const cache = path.join(root, 'node_modules', '.vite')
fs.rmSync(cache, { recursive: true, force: true })
console.log('[vite] Cleared dependency cache:', cache)
