import Link from 'next/link'

type BreadCrumbsProps = {
  lists: {
    string: string
    path?: string
  }[]
}

export const BreadCrumbs = ({ lists }: BreadCrumbsProps) => {
  if (!lists) {
    return <></>
  }

  return (
    <ol className='flex overflow-x-auto my-3 text-gray-600 whitespace-nowrap' aria-label='breadcrumb'>
      {lists.map(({ string, path }, index) => (
        <li className='flex items-center' key={index}>
          {lists.length - 1 !== index ? (
            <>
              <Link href={`${path}`}>
                <a className='text-sm hover:underline md:text-base'>{string}</a>
              </Link>
              <span className='px-2 text-sm md:text-base'>&gt;</span>
            </>
          ) : (
            <span className='text-sm md:text-base' aria-current='page'>
              {string}
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
