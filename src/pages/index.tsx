import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getAllPosts } from '@/lib/api'
import { Profile } from '@/components/Profile'
import { Menu } from '@/components/Menu'
import { Footer } from '@/components/Footer'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'updated', 'tags'])
  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <div className='mx-auto p-4 md:p-6'>
      <Head>
        <title>TeQu</title>
        <link href='https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@500&display=swap' rel='stylesheet' />
        <meta name='description' content='TeQu, A XRP Ledger ecosystem developer from Japan' />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <main className='max-w-3xl mx-auto min-h-screen'>
        <Profile />
        <Menu />
      </main>
      <Footer />
    </div>
  )
}

export default Home
