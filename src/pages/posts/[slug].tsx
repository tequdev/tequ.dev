import { NextPage, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Footer } from '@/components/Footer'

import { getAllPosts, getPostBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import createOgp from '@/utils/server/ogpUtils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug', 'title', 'tags'])
    .filter((post) => !post.tags?.find(tag => tag === 'Zenn' || tag === 'Qiita'))
  posts.forEach((post) => createOgp(post.slug, post.title))

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, ['slug', 'title', 'updated', 'content', 'description'])
  // Markdown を HTML に変換する
  const content = await markdownToHtml(post.content)
  // content を詰め直して返す
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className='p-4 mx-auto md:p-6'>
      <Head>
        <title>{post.title}</title>
        {!!post.description && <meta name='description' content={post.description} />}
        <link rel='icon' href='/favicon.svg' />
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={`${baseUrl}/posts/${post.slug}`} />
        <meta property='og:title' content={post.title} />
        <meta property='og:image' content={`${baseUrl}/ogp/${post.slug}.png`} />
        {!!post.description && <meta name='og:description' content={post.description} />}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@_TeQu_' />
      </Head>

      <main className='mx-auto max-w-3xl min-h-screen'>
        <BreadCrumbs
          lists={[
            {
              string: 'TeQu',
              path: '/',
            },
            {
              string: 'Posts',
              path: '/posts',
            },
            {
              string: `${post.title}`,
              path: `/posts/${post.slug}`,
            },
          ]}
        />
        <article className='my-10'>
          <h1 className='pl-4 mb-4 text-4xl border-l-4 border-green-200'>{post.title}</h1>
          <p className='text-gray-500'>{post.updated}</p>
          <div
            className='my-10 markdown'
            dangerouslySetInnerHTML={{ __html: post.content.replace(/href/g, "target='_blank' href") }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Post
