import React from 'react'

const NewsLetter = () => {
  return (
  <div className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-primary text-white">
    <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-[40px]">Stay Inspired</h1>
        <p className="text-sm md:text-base text-white/80 mt-2 max-w-xl">
            Join our newsletter and be the first to discover new updates, exclusive offers, and inspiration.
        </p>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <input
            type="text"
            className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full placeholder-white/70 text-white"
            placeholder="Enter your email"
        />
        <button className="flex items-center justify-center gap-2 group bg-white text-primary px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">
            Subscribe
            <svg
  className="w-4 h-4 text-primary"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M19 12H5m14 0-4 4m4-4-4-4"
  />
</svg>

        </button>
    </div>
    <p className="text-white/70 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
    </p>
</div>

  )
}

export default NewsLetter
