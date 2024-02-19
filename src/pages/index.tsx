import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getAllPosts } from '@/lib/api'
import Link from 'next/link'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['url','slug', 'title', 'updated', 'tags'])
  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>tequ</title>
        <link href='https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@500&display=swap' rel='stylesheet' />
        <meta name='description' content='tequ, A XRP Ledger ecosystem developer from Japan' />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <div>
        <h1 className='pl-4 border-l-4 border-orange-200 text-4xl'>Posts</h1>
        <div className='my-10'>
          {allPosts.map((post) => (
            <Link href={post.url || `posts/${post.slug}`} passHref key={post.url || post.slug}>
              <a
                target={post.url ? '_blank' : undefined}
                className='block my-2 md:m-4 px-4 pb-4 pt-2 md:p-6 border-2 rounded-2xl hover:shadow hover:transition-all duration-500'
              >
                <div className='text-sm mb-2'>
                  {(post.tags || []).map((tag, idx) => (
                    <span className='mr-1 border-2 text-sm border-gray-400 px-2 py-1 rounded-2xl' key={idx}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className='text-lg font-medium'>{post.title}</h4>
                <span className='text-sm text-gray-400'>{post.updated}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
