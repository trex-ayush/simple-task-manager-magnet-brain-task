import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} TaskFlow. All rights reserved.</div>
        <div className="flex gap-4">
          <a className="hover:text-gray-800" href="#features">Features</a>
          <a className="hover:text-gray-800" href="#security">Security</a>
          <a className="hover:text-gray-800" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer




