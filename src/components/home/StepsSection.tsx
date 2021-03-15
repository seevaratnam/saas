interface Props {
  image: string;
  steps: Array<{
    name: string;
    description: string;
  }>;
}

const StepsSection: React.FC<Props> = ({ image, steps }) => {
  // returns a different icon based on the given index for demo purposes
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
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
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
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      case 2:
        return (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        );
      case 3:
        return (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
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
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
        );
    }
  };

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {steps?.map((step, i) => {
              return (
                <div className="flex relative pb-12" key={i}>
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    {i !== steps.length - 1 && (
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-royal-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    {renderIcon(i)}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-bold title-font text-sm text-gray-900 mb-1 tracking-wider">
                      {step.name}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src={image}
            alt="step"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
