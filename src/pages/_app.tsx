import '../../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { Profile } from '@/components/Profile'
import { Footer } from '@/components/Footer'
import { Menu } from '@/components/Menu'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='bg-gray-50 py-4'>
      <header className='md:flex justify-center px-8'>
        <Profile />
        <Menu />
      </header>
      <main className='mx-auto px-4 py-10 md:px-6 max-w-3xl min-h-screen'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
