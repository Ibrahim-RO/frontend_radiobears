import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useMemo } from 'react'

export const Layout = () => {
  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  return (
    <div className='min-h-screen flex flex-col'>
      <Helmet>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5283462238748328"
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <Header />
      <main className={isHome ? '' : 'max-w-7xl mx-auto px-8 md:p-5 lg:p-0 py-5 flex-1'}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
