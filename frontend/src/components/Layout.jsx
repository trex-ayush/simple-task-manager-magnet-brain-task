import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
