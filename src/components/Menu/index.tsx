import Link from 'next/link'

export const Menu = () => {
  return (
    <div className='mt-4 md:mt-4 flex justify-center'>
      <div className='p-3 hover:pl-6 mx-9 border-l-2 hover:border-l-4 border-orange-200 hover:transition-all duration-500 hover:cursor-pointer'>
        <Link href='/'>
          <a>
            <div>POSTS</div>
          </a>
        </Link>
      </div>
      <div className='p-3 hover:pl-6 mx-9 border-l-2 hover:border-l-4 border-green-200 hover:transition-all duration-500 hover:cursor-pointer'>
        <Link href='/works'>
          <a>
            <div>WORKS</div>
          </a>
        </Link>
      </div>
      <div className='p-3 hover:pl-6 mx-9 border-l-2 hover:border-l-4 border-sky-200 hover:transition-all duration-500 hover:cursor-pointer'>
        <Link href='/about'>
          <a>
            <div>ABOUT</div>
          </a>
        </Link>
      </div>
    </div>
  )
}
