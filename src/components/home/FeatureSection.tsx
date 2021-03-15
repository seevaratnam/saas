import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  features: Array<{
    name: string;
    description: string;
  }>;
}

const FeatureSection: React.FC<Props> = ({ title, description, features }) => {
  const renderIcon = (i: number) => {
    switch (i) {
      case 0:
        return (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        );
      case 1:
        return (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      default:
        return (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
    }
  };

  return (
    <section className="text-gray-700 body-font" id="features">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            {description}
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-royal-blue-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {features?.map((feature, i) => {
            return (
              <div
                className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center items-center"
                key={i}
              >
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-royal-blue-100 text-royal-blue-500 mb-5 flex-shrink-0">
                  {renderIcon(i)}
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                    {feature.name}
                  </h2>
                  <p className="leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/signup">
          <button className="flex mx-auto mt-16 text-white bg-royal-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-royal-blue-600 rounded text-lg">
            Start Free
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
