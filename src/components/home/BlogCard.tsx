import Link from 'next/link';

const BlogCard: React.FC<{ post: any }> = ({ post }) => {
  const { attributes } = post;

  return (
    <div className="flex flex-col h-full border-2 border-gray-200 rounded-lg overflow-hidden">
      <img
        className="lg:h-48 md:h-36 w-full object-cover object-center"
        src={attributes.image}
        alt="blog"
        loading="lazy"
      />
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          {attributes.category}
        </h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
          {attributes.title}
        </h1>
        <p className="leading-relaxed mb-3">{attributes.description}</p>
        <div className="flex items-center flex-wrap ">
          <Link href="/blog/[uid]" as={`/blog/${attributes.slug}`}>
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Read more
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
