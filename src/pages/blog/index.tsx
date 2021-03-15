import { GetStaticProps, NextPage } from 'next';

import Layout from 'components/home/Layout';
import BlogCard from 'components/home/BlogCard';

const BlogPage: NextPage<{ posts: any[] }> = ({ posts }) => {
  return (
    <Layout>
      <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="container mx-auto">
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
              {posts.map((post, i) => {
                return <BlogCard post={post} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context) as any;

    const data = keys.map((_, index) => {
      const post = values[index];
      return post;
    });

    return data;
  })(require.context('../../content/posts', true, /\.md$/));

  return { props: { posts } };
};

export default BlogPage;
