import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import feeds from '../../builder/posts.json'

type Tag = 'XRP' | 'ILP' | 'Other' | 'Zenn' | 'Qiita' | 'Note'

type Post = {
  url?: string
  slug: string
  content: string
  title: string
  description?: string
  updated: string
  tags: Tag[]
}

type About = {
  content: string
  title: string
  updated: string
}

type Work = {
  content: string
  AppName: string
  repo: string
  link: string
  updated: string
  tags: Tag[]
}

type MarkdownContent = Post | About | Work

const contentsDirectory = (dir: string) => path.join(process.cwd(), 'content', dir)

/**
 * postsDirectory 以下のディレクトリ名を取得する
 */
export const getContentSlugs = (dir: string) => {
  const allDirents = fs.readdirSync(contentsDirectory(dir), { withFileTypes: true })
  return allDirents.filter((dirent) => dirent.isDirectory()).map(({ name }) => name)
}

/**
 * 指定したフィールド名から、記事のフィールドの値を取得する
 */
const getContentBySlug = <T extends MarkdownContent>(dir: string, slug: string, fields: (keyof T)[] = []) => {
  const fullPath = path.join(contentsDirectory(dir), slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  let items: Partial<T> = {}

  fields.forEach((field) => {
    const fieldData = field === 'slug' ? slug : field === 'content' ? content : (data as { [P in keyof T]: any })[field]
    items = {
      ...items,
      [field]: fieldData || null,
    }
  })
  return items as T
}

const getFeedContents = (): Post[] => {
  return feeds.map(
    (feed): Post => ({
      url: feed.link,
      slug: '',
      content: feed.contentSnippet,
      title: feed.title,
      description: feed.contentSnippet,
      updated: feed.isoDate.split('T')[0].replace(/-/g, '/'),
      tags: feed.link.includes('zenn.dev') ? ['Zenn'] : feed.link.includes('qiita.com') ? ['Qiita'] : feed.link.includes('note.com') ? ['Note'] : [],
    })
  )
}

/**
 * すべての記事について、指定したフィールドの値を取得して返す
 * @param fields 取得するフィールド
 */
const getAllContents = <T extends MarkdownContent>(dir: string, fields: (keyof T)[] = []): T[] => {
  const slugs = getContentSlugs(dir)
  let contents = slugs.map((slug) => getContentBySlug<T>(dir, slug, fields))
  if (dir === 'posts') {
    const feedContents = getFeedContents()
    const posts = [...(contents as Post[]), ...feedContents]
    return posts.sort((a, b) => (a.updated && b.updated && a.updated > b.updated ? -1 : 1)) as unknown as T[]
  }
  return contents.sort((a, b) => (a.updated && b.updated && a.updated > b.updated ? -1 : 1))
}

export const getAllPosts = (fields: (keyof Post)[] = []) => {
  return getAllContents<Post>('posts', fields)
}
export const getPostBySlug = (slug: string, fields: (keyof Post)[]) => {
  return getContentBySlug<Post>('posts', slug, fields)
}
export const getAllWorks = (fields: (keyof Work)[] = []) => {
  return getAllContents<Work>('works', fields)
}
export const getWorkBySlug = (slug: string, fields: (keyof Work)[]) => {
  return getContentBySlug<Work>('works', slug, fields)
}
export const getAbout = (fields: (keyof About)[] = []) => {
  return getContentBySlug<About>('about', '', fields)
}
