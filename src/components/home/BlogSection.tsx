import BlogCard from 'components/home/BlogCard';
import { useEffect, useState } from 'react';

const BlogSection: React.FC<{
  title: string;
  description: string;
  slugs: string[];
}> = ({ title, description, slugs }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsPromises = await slugs.map(async (slug) => {
        return import(`../../content/posts/${slug}.md`);
      });

      Promise.all(postsPromises).then(setPosts);
    };

    getPosts();
  }, [slugs]);

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center w-full mb-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font mb-4 text-gray-900">
            {title}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap -m-4 mt-4">
          {posts?.map((post, i) => {
            return (
              <div className="p-4 md:w-1/3" key={i}>
                <BlogCard post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
