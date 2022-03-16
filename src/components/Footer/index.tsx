export const Footer = () => {
  return (
    <footer className='flex justify-center items-center flex-grow'>
      <span className='text-xs text-gray-500'>©TeQu {`${new Date().getFullYear()}`}</span>
    </footer>
  )
}
