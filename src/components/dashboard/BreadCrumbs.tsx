import Link from 'next/link';

interface Props {
  breadCrumbs: {
    back: {
      path: string;
      text: string;
    };
    first: {
      path: string;
      text: string;
    };
    second?: {
      path: string;
      text: string;
    };
    third?: {
      path: string;
      text: string;
    };
  };
}

const BreadCrumbs: React.FC<Props> = ({ breadCrumbs }) => {
  return (
    <>
      <nav className="sm:hidden">
        <Link href={breadCrumbs.back.path} as={breadCrumbs.back.path}>
          <a
            href=""
            className="flex items-center text-sm leading-5 font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >
            <svg
              className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </a>
        </Link>
      </nav>
      <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
        <Link href={breadCrumbs.first.path} as={breadCrumbs.first.path}>
          <a
            href=""
            className="text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >
            {breadCrumbs.first.text}
          </a>
        </Link>
        {breadCrumbs.second && (
          <>
            <svg
              className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link href={breadCrumbs.second.path} as={breadCrumbs.second.path}>
              <a
                href=""
                className="text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
              >
                {breadCrumbs.second.text}
              </a>
            </Link>
            {breadCrumbs.third && (
              <>
                <svg
                  className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link href={breadCrumbs.third.path} as={breadCrumbs.third.path}>
                  <a
                    href=""
                    className="text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                  >
                    {breadCrumbs.third.text}
                  </a>
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default BreadCrumbs;
