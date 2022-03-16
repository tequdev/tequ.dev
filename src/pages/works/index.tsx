import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Footer } from '@/components/Footer'
import { getAllWorks } from '@/lib/api'
import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allWorks = getAllWorks(['AppName', 'url', 'tags', 'repo', 'content'])
  return {
    props: { allWorks },
  }
}

export const Works: NextPage<Props> = ({ allWorks }) => {
  return (
    <div className='mx-auto p-4 md:p-6'>
      <Head>
        <title>Works | TeQu</title>
        <meta name='description' content='Works by TeQu' />
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
              string: 'Works',
            },
          ]}
        />
        <h1 className='pl-4 border-l-4 border-green-200 text-4xl'>Works</h1>
        <div className='my-10'>
          {allWorks.map((work, index) => (
            <div
              className='block my-2 md:m-4 p-6 border-2 rounded-2xl hover:shadow hover:transition-all duration-500'
              key={index}
            >
              <h4 className='pb-3'>{work.AppName}</h4>
              <span className='text-sm text-gray-400'>{work.updated}</span>
              <div
                className='mardown text-sm text-gray-500'
                dangerouslySetInnerHTML={{ __html: work.content.replace(/href/g, "target='_blank' href") }}
              />
              {!!work.tags.length && (
                <div className='-mb-3 mt-3 text-right text-gray-500'>
                  {(work.tags || []).map((tag, idx) => (
                    <span className='ml-1 border-2 text-sm border-gray-400 px-2 py-1 rounded-2xl' key={idx}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Works
