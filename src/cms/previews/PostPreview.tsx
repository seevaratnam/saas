import { ComponentType } from 'react';
import BlogCard from 'components/home/BlogCard';

const PostPreview: ComponentType<any> = ({ entry, widgetFor }) => {
  const post = {
    title: entry.getIn(['data', 'title']),
    description: entry.getIn(['data', 'description']),
    image: entry.getIn(['data', 'image']),
    category: entry.getIn(['data', 'category']),
    body: widgetFor('body'),
  };

  return (
    <>
      <article>
        <div className="bg-gray-800 pb-32">
          <header className="pt-16 pb-12 container mx-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl leading-9 font-bold text-white text-center">
                {post.title}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32 container mx-auto md:px-6 lg:px-32">
          <div className="max-w-4xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="prose min-h-screen bg-white rounded-lg shadow-xl p-6 sm:p-8 text-lg">
              {post.body}
            </div>
          </div>
        </main>
      </article>
      <section className="text-gray-700 body-font container p-12 mx-auto">
        <h1 className="text-2xl leading-9 font-bold">Preview</h1>
        <div className="flex flex-wrap -m-4 mt-4">
          <div className="p-4 md:w-1/2">
            <BlogCard post={{ attributes: post }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PostPreview;
