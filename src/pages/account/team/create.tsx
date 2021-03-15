import Link from 'next/link';

import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import Layout from 'components/dashboard/Layout';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createTeam } from 'services/team';

const breadCrumbs = {
  back: {
    path: '/account',
    text: 'Back',
  },
  first: {
    path: '/account',
    text: 'Account',
  },
  second: {
    path: '/account/team',
    text: 'Team',
  },
  third: {
    path: '/account/team/create',
    text: 'Create a Team',
  },
};

const Account: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();
  const auth = useAuth();
  if (!auth.user) return null;

  const onSubmit = (data) => {
    setIsLoading(true);
    setError(null);

    createTeam(data).then((response: { error?: { massage: string } }) => {
      setIsLoading(false);
      response?.error ? setError(response.error) : router.push('/account/team');
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-300 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                Create a Team
              </h2>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className="w-full sm:w-1/3 sm:pr-16">
            <AccountMenu />
          </div>
          <main className="hidden sm:block w-2/3 mx-auto bg-white overflow-hidden shadow rounded-lg px-5 py-6 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {error?.message && (
                <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
                  <span>{error.message}</span>
                </div>
              )}
              <div>
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create a team
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      After you have created a team you can start inviting
                      people to your team.
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
                        <div className="max-w-md rounded-md shadow-sm">
                          <input
                            id="name"
                            name="name"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-5">
                <div className="flex justify-end">
                  <span className="inline-flex rounded-md shadow-sm">
                    <Link href="/account">
                      <button
                        type="button"
                        className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                    </Link>
                  </span>
                  <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700 transition duration-150 ease-in-out"
                    >
                      {isLoading ? 'Loading...' : 'Save'}
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
