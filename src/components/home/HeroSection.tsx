import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  image: string;
}

const HeroSection: React.FC<Props> = ({
  title,
  description,
  image,
}): JSX.Element => {
  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
            {title}
          </h1>
          <p className="mb-8 leading-relaxed">{description}</p>
          <div className="flex justify-center">
            <Link href="/login">
              <a>
                <button className="inline-flex text-white bg-royal-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-royal-blue-600 rounded text-lg">
                  Login
                </button>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                  Sign Up
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
