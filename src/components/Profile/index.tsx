import Image from 'next/image'

export const Profile = () => {
  return (
    <div className='flex-row text-center align-bottom md:flex content'>
      <h1 className='text-6xl' style={{ fontFamily: 'Sansita Swashed, cursive' }}>
        Te<span style={{ color: 'rgb(83, 86, 227)' }}>Q</span>u
      </h1>
      <div className='pt-4 align-bottom md:px-6 md:pt-8 md:text-left'>
        <span className='text-gray-500'>A XRP Ledger ecosystem devleloper</span>
      </div>
    </div>
  )
}
