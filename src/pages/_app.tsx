import '../../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='bg-gray-50'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
