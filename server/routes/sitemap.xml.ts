import { SitemapStream, streamToPromise } from 'sitemap'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { getPageTable } from "~/lib/api";

const BASE_URL = 'https://park-jihoo.github.io'

export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({ hostname: BASE_URL })

  const staticEndpoints = getStaticEndpoints()
  for (const staticEndpoint of staticEndpoints) {
    sitemap.write({ url: staticEndpoint, changefreq: 'daily' })
  }

  const dynamicRoutes = await getDynamicRoutes()
  for (const dynamicRoute of dynamicRoutes) {
    sitemap.write({ url: dynamicRoute.loc, changefreq: 'daily' })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})

function getStaticEndpoints(): string[] {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const files = getFiles(`${__dirname}/../../pages`)
  return files
    .filter((file) => !file.includes('slug')) // exclude dynamic content
    .map((file) => file.split('pages')[1])
    .map((file) => {
      return file.endsWith('index.vue') ? file.split('/index.vue')[0] : file.split('.vue')[0]
    })
}

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  })
  return files.flat()
}

async function getDynamicRoutes(){
  const [
    notes,
    algorithm,
  ] = await Promise.all([
    getPageTable("619787c75b60479886c147cf746bfbb8"),
    $fetch('/api/algorithm')
  ])

  let urls = []
  if (notes){
    for (const note of notes) {
      urls.push({
        loc: `/notes/${note.id}`,
      })
    }

  }
  for (const a of algorithm) {
    urls.push({
      loc : `${a.url}`,
    })
  }

  return urls;
}
