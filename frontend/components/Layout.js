import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children, title = 'Weekly Blog', description = 'A modern blog with amazing content' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gradient">Weekly Blog</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  All Posts
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  About
                </Link>
                <a
                  href="/admin"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-100">
                <div className="flex flex-col space-y-4">
                  <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                    Home
                  </Link>
                  <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium">
                    All Posts
                  </Link>
                  <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
                    Categories
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
                    About
                  </Link>
                  <a
                    href="/admin"
                    className="btn-primary inline-block text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Admin
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gradient">Weekly Blog</span>
                </Link>
                <p className="text-gray-600 mb-4">
                  Sharing amazing content every week. Stay tuned for the latest insights, tutorials, and stories.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link></li>
                  <li><Link href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">All Posts</Link></li>
                  <li><Link href="/categories" className="text-gray-600 hover:text-primary-600 transition-colors">Categories</Link></li>
                  <li><Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Admin
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/admin"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CMS Dashboard
                    </a>
                  </li>
                  <li><Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500">
                © 2024 Weekly Blog. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}