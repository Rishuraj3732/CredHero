import React from 'react';
import { Link } from 'react-router-dom';
export default function Homedetail() {
  return (
    <>
      <div className="relative overflow-hidden w-full -mt-40">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 left-0 right-0 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
          <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-0 lg:py-0">
            <div className="text-center w-full">
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                Connecting Homes and Brands
              </p>

              <div className="mt-5">
                <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                  Advertise Creatively on Local Walls
                </h1>
              </div>

              <div className="mt-5 w-full">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Wallspot links homeowners offering their walls for advertisements with brands and organizations looking for creative, impactful spaces to promote their messages. Reach your local audience like never before.
                </p>
              </div>
             
              <div className="mt-8 gap-3 flex justify-center">
              <Link to='search'>
              <a
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="#"
                >
                  Get Started
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
                
              </Link>
              <Link to='form'>
                <a
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="#"
                >
                  Register
                </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
