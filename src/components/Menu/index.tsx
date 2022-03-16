import Link from 'next/link'

export const Menu = () => {
  return (
    <div className='md:m-10'>
      <div className='p-3 hover:pl-6 m-3 md:m-9 border-l-2 hover:border-l-4 border-green-200  hover:transition-all duration-500'>
        <Link href='/works'>
          <a>
            <div>WORKS</div>
            <div>
              <span className='text-sm text-gray-400'>Applications I have developed</span>
            </div>
          </a>
        </Link>
      </div>
      <div className='p-3 hover:pl-6 m-3 md:m-9 border-l-2 hover:border-l-4 border-orange-200 hover:transition-all duration-500'>
        <Link href='/posts'>
          <a>
            <div>POSTS</div>
            <div>
              <span className='text-sm text-gray-400'>Articles on Development and More</span>
            </div>
          </a>
        </Link>
      </div>
      <div className='p-3 hover:pl-6 m-3 md:m-9 border-l-2 hover:border-l-4 border-sky-200 hover:transition-all duration-500'>
        <Link href='/about'>
          <a>
            <div>ABOUT</div>
            <div>
              <span className='text-sm text-gray-400'>About me</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
