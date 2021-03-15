import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { db } from 'config/firebase';
import { useTeam } from 'hooks/useTeam';

const ProjectForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const auth = useRequireAuth();
  const { team } = useTeam();
  const { register, errors, handleSubmit } = useForm();

  if (!auth.user) return null;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const projectRef = db.collection('projects').doc(data.slug);

    projectRef.get().then((doc) => {
      if (doc.exists) {
        setIsLoading(false);
        setError('Slug is not available');
        return;
      }
      projectRef
        .set({ ...data, teamId: team.id, sortedPageIds: [] }, { merge: true })
        .then(() => {
          router.push('/projects');
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
              Create a new project
            </h3>
            <p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
              Enter a name to create a project and start building your
              documentation
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
                    className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ref={register({
                      required: 'Please enter a username',
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
                  <input
                    id="slug"
                    name="slug"
                    className="inline-flex w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 appearance-none rounded-l-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    ref={register({
                      required: 'Please enter a valid slug',
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: 'Not a valid slug',
                      },
                    })}
                  />
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md sm:text-sm">
                    .dopedocs.io
                  </span>
                  {errors.name && (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 mt-8 border-t border-gray-200">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <Link href="/projects">
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
