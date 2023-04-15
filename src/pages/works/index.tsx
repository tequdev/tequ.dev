import { BreadCrumbs } from '@/components/BreadCrumbs'
import { getAllWorks } from '@/lib/api'
import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allWorks = getAllWorks(['AppName', 'tags', 'repo', 'link', 'content'])
  return {
    props: { allWorks },
  }
}

export const Works: NextPage<Props> = ({ allWorks }) => {
  return (
    <>
      <Head>
        <title>Works | TeQu</title>
        <meta name='description' content='Works by TeQu' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

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
          <a key={index} href={work.link} target='_blank'>
            <div className='block my-2 md:m-4 p-6 border-2 rounded-2xl hover:shadow hover:transition-all duration-500'>
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
          </a>
        ))}
      </div>
    </>
  )
}
export default Works
