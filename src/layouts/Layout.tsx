import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useMemo } from 'react'

export const Layout = () => {
  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  return (
    <>
      <Header />
      <main className={isHome ? '' : 'max-w-7xl mx-auto px-8 md:p-5 lg:p-0 py-5'}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
