import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img
              className="h-8 w-auto sm:h-10"
              src="/img/logo.png"
              alt="Serverless SaaS Boilerplate"
            />
          </a>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a
            href="#features"
            className="mr-5 text-base text-gray-600 hover:text-gray-800"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="mr-5 text-base text-gray-600 hover:text-gray-800"
          >
            Pricing
          </a>
          <a
            href="#team"
            className="mr-5 text-base text-gray-600 hover:text-gray-800"
          >
            Team
          </a>
          <Link href="/blog">
            <a href="#" className="text-base text-gray-600 hover:text-gray-800">
              Blog
            </a>
          </Link>
        </nav>
        <div>
          <Link href="/login">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-gray-200 hover:bg-gray-300 focus:outline-none focus:border-gray-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700 transition duration-150 ease-in-out md:mt-0 mt-4 md:mt-0 mr-4">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700 transition duration-150 ease-in-out mt-4 md:mt-0">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
