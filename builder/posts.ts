import fs from 'fs-extra'
import Parser from 'rss-parser'
import { feeds } from './feeds'
import { fetchFromNoteAPI, fetchFromQiitaAPI } from './api'

type FeedItem = {
  title: string
  link: string
  contentSnippet?: string
  isoDate?: string
  dateMiliSeconds: number
}

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

const parser = new Parser()
let allPostItems: any[] = []

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url)
  if (!feed?.items?.length) return []

  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ''),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      }
    })
    .filter(({ title, link }) => title && link && isValidUrl(link)) as FeedItem[]
}

// async function getFeedItemsFromSources(sources: undefined | string[]) {
//   if (!sources?.length) return []
//   let feedItems: FeedItem[] = []
//   for (const url of sources) {
//     const items = await fetchFeedItems(url)
//     if (items) feedItems = [...feedItems, ...items]
//   }
//   return feedItems
// }

async function getFeedItems(sources: string): Promise<any[]> {
  const feedItems = await fetchFeedItems(sources)
  if (!feedItems) return []
  return feedItems
}

async function getApiItems() {
  const qiitaItems = await fetchFromQiitaAPI()
  const noteItems = await fetchFromNoteAPI()
  return [...qiitaItems, ...noteItems]
}

; (async function () {
  // feed
  for (const member of feeds) {
    const items = await getFeedItems(member)
    if (items) allPostItems = [...allPostItems, ...items]
  }
  // api
  const apiItems = await getApiItems()
  allPostItems = [...allPostItems, ...apiItems]
  allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds)
  fs.writeJsonSync('builder/posts.json', allPostItems)
})()
