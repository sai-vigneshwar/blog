import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 md:px-16 lg:px-24 xl:px-32 w-full">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-white/20">

        {/* Left Section - Logo and Info */}
        <div className="max-w-96">
          {/* Logo */}
          <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
            <path d="M12 0L24 22H0L12 0z" />
          </svg>

          {/* Description */}
          <p className="mt-6 text-sm text-gray-300">
            We share stories, insights, and tutorials on design, development, and the creator economy. Whether you're a beginner or expert, our blog helps you stay informed and inspired.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4">
            {/* Twitter */}
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M24 4.56c-.89.39-1.85.65-2.86.77a5.03 5.03 0 002.21-2.77 10.08 10.08 0 01-3.19 1.22 5.01 5.01 0 00-8.53 4.56A14.2 14.2 0 011.67 3.15a5.01 5.01 0 001.55 6.69 5.04 5.04 0 01-2.27-.63v.06a5.01 5.01 0 004.01 4.91 5.05 5.05 0 01-2.25.09 5.01 5.01 0 004.67 3.47 10.04 10.04 0 01-6.21 2.15c-.4 0-.79-.02-1.18-.07a14.15 14.15 0 007.66 2.25c9.2 0 14.23-7.63 14.23-14.23 0-.22 0-.44-.02-.66A10.12 10.12 0 0024 4.56z" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="#" aria-label="GitHub" className="hover:text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.21.09 1.84 1.25 1.84 1.25 1.08 1.84 2.84 1.31 3.53 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.51.12-3.14 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.8c1.02.01 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.63.24 2.84.12 3.14.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.66-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M19 0h-14C2.25 0 0 2.25 0 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.53a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.15 1.46-2.15 2.97v5.7H9.31V9h3.41v1.56h.05c.48-.91 1.67-1.87 3.45-1.87 3.69 0 4.37 2.43 4.37 5.58v6.18z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="w-full md:w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 className="font-semibold text-white mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-300 space-y-2 list-none">
              <li><a href="#" className="hover:text-white">Getting Started</a></li>
              <li><a href="#" className="hover:text-white">Writing Guides</a></li>
              <li><a href="#" className="hover:text-white">Content Tools</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-5">ABOUT</h2>
            <ul className="text-sm text-gray-300 space-y-2 list-none">
              <li><a href="#" className="hover:text-white">Our Mission</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Legal</a></li>
            </ul>
          </div>
        </div>

      </div>

      <p className="py-4 text-center text-xs md:text-sm text-gray-400">
        © 2024 YourBlogName. Crafted with ❤️ for writers and readers. Powered by{' '}
        <a href="https://prebuiltui.com" className="underline hover:text-white">PrebuiltUI</a>.
      </p>
    </footer>
  );
}

export default Footer
