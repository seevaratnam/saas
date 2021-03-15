import Link from 'next/link';

const SideBarLayout: any = ({ children, pages }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          {/*
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      */}
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          {/*
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      */}
          <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
            <div className="absolute top-0 right-0 p-1 -mr-14">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="w-auto h-8" src="/img/logo.png" alt="logo" />
              </div>
              <nav className="px-2 mt-5 space-y-1">
                {pages?.map((page) => (
                  <Link href={`/docs/${page.slug}`} key={page.slug}>
                    <a
                      href=""
                      className="flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-900 transition duration-150 ease-in-out bg-gray-100 rounded-md group focus:outline-none focus:bg-gray-200"
                    >
                      {page.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4">
                <Link href="/">
                  <img className="w-auto h-16" src="/img/logo.png" alt="logo" />
                </Link>
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                <div className="pt-6">
                  {/* <h3
                    className="px-3 text-xs font-semibold leading-4 tracking-wider text-gray-500 uppercase"
                    id="projects-headline"
                  >
                    Projects
                  </h3> */}
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="projects-headline"
                  >
                    {pages?.map((page) => (
                      <Link href={`/docs/${page.slug}`} key={page.slug}>
                        <a
                          href=""
                          className="flex items-center px-3 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                        >
                          <span className="truncate">{page.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="pt-1 pl-1 md:hidden sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-label="Open sidebar"
          >
            {/* Heroicon name: menu */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SideBarLayout;
