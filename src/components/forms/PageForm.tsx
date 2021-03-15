import { useState } from 'react';
import Link from 'next/link';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { db } from 'config/firebase';
import { stringToSlug } from 'utils/makeId';

const ProjectForm: React.FC<any> = ({ page }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(page?.content || '**Hello world!**');
  const [name, setName] = useState(page?.name || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { push, query } = useRouter();
  const auth = useRequireAuth();
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      name: page?.name,
      slug: page?.id,
    },
  });

  if (!auth.user) return null;

  const fillSlug = () => {
    if (!page?.id && !slug) {
      const slug = stringToSlug(name);
      setSlug(slug);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const pageRef = db
      .collection('projects')
      .doc(query.projectId.toString())
      .collection('pages')
      .doc(query.pageId || data.slug);

    pageRef.get().then((doc) => {
      if (doc.exists && !page?.id) {
        setIsLoading(false);
        setError('Slug is not available');
        return;
      }
      pageRef
        .set(
          {
            ...data,
            projectId: query.projectId,
            updatedAt: Date.now(),
          },
          { merge: true }
        )
        .then(() => {
          push(`/projects/${query.projectId}`);
        })
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error}</span>
        </div>
      )}
      <div>
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Create a new page
            </h3>
            <p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
              Build your page
            </p>
          </div>
          <div className="mt-6 sm:mt-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="rounded-md shadow-sm ">
                  <input
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ref={register({
                      required: 'Please enter a name',
                    })}
                  />
                  {errors.name && (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Slug
              </label>

              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md sm:text-sm">
                    {`${query.projectId}.dopedocs.io/`}
                  </span>
                  <input
                    id="slug"
                    name="slug"
                    onFocus={() => fillSlug()}
                    onChange={(e) => setSlug(e.target.value)}
                    value={slug && slug}
                    readOnly={!!page?.id}
                    className="inline-flex w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 appearance-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ref={register({
                      required: 'Please enter a valid slug',
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: 'Not a valid slug',
                      },
                    })}
                  />
                  {errors.slug && (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.slug.message}
                    </div>
                  )}
                </div>
              </div>

              <label
                htmlFor="content"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Content
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex rounded-md shadow-sm">
                  <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                      Promise.resolve(<ReactMarkdown source={markdown} />)
                    }
                    childProps={{
                      writeButton: {
                        tabIndex: -1,
                      },
                      textArea: {
                        name: 'content',
                        id: 'content',
                        ref: register(),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 mt-8 border-t border-gray-200">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <Link href={`/projects/${query.projectId}`}>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              >
                Cancel
              </button>
            </Link>
          </span>
          <span className="inline-flex ml-3 rounded-md shadow-sm">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700"
            >
              {isLoading ? 'Loading...' : 'Save'}
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
