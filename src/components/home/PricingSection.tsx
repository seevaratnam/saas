import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  plans: Array<{
    name: string;
    description: string;
    price: string;
    usps: { name: string }[];
  }>;
}

const PricingSection: React.FC<Props> = ({ title, description, plans }) => {
  return (
    <section className="text-gray-700 body-font" id="pricing">
      <div className="md:max-w-5xl lg:max-w-6xl px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold title-font text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            {description}
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {plans?.map((plan, i) => {
            return (
              <div className="p-4 md:w-1/3 w-full" key={i}>
                <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                  <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                    {plan.name}
                  </h2>
                  <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                    <span>{plan.price}</span>
                    <span className="text-lg ml-1 font-normal text-gray-500">
                      /mo
                    </span>
                  </h1>
                  <div className="my-2">
                    {plan.usps?.map((usp, i) => {
                      return (
                        <p
                          className="flex items-center text-gray-600 mb-2"
                          key={i}
                        >
                          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              className="w-3 h-3"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                          </span>
                          {usp}
                        </p>
                      );
                    })}
                  </div>
                  <Link href="/signup">
                    <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                      Start free
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </Link>
                  <p className="text-xs text-gray-500 mt-3">
                    {plan.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
