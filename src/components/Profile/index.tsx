import Image from 'next/image'

export const Profile = () => {
  return (
    <div className='flex-row md:flex content text-center align-bottom'>
      <h1 className='text-6xl' style={{ fontFamily: 'Sansita Swashed, cursive' }}>
        Te<span style={{ color: 'rgb(83, 86, 227)' }}>Q</span>u
      </h1>
      <div className='md:px-6 md:text-left pt-4 md:pt-8 align-bottom'>
        <span className='text-gray-500'>A XRP Ledger ecosystem devleloper</span>
      </div>
    </div>
  )
}
