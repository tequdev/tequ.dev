import { NextPage, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Footer } from '@/components/Footer'

import { getAllPosts, getPostBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

type Props = InferGetStaticPropsType<typeof getStaticProps>

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])
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
  const post = getPostBySlug(params.slug, ['slug', 'title', 'updated', 'content'])
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
    <div className='mx-auto p-4 md:p-6'>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content='post by TeQu' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <main className='max-w-3xl mx-auto min-h-screen'>
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
          <h1 className='pl-4 mb-4 border-l-4 border-green-200 text-4xl'>{post.title}</h1>
          <p className='text-gray-500'>{post.updated}</p>
          <div
            className='markdown my-10'
            dangerouslySetInnerHTML={{ __html: post.content.replace(/href/g, "target='_blank' href") }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Post
