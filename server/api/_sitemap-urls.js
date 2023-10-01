import { getPageTable } from "~/lib/api";

export default defineEventHandler(async () => {
  const [
    notes,
    algorithm,
  ] = await Promise.all([
    getPageTable("619787c75b60479886c147cf746bfbb8"),
    $fetch('/api/algorithm')
  ])

  let urls = []
  for (const note of notes) {
    urls.push({
      loc: `/notes/${note.id}`,
    })
  }

  for (const a of algorithm) {
    urls.push({
      loc : `/${a.url}`,
    })
  }

  return urls;
})