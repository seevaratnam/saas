import Link from 'next/link';

import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import Button from 'components/elements/Button';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import { getPlan } from 'utils/getPlan';
import { useState, useEffect } from 'react';
import PlanPill from 'components/dashboard/PlanPill';

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
    path: '/account',
    text: 'General',
  },
};

const Account: React.FC = () => {
  const [plan, setPlan] = useState(null);
  const { user } = useRequireAuth();

  useEffect(() => {
    if (user?.teamId && !plan) {
      getPlan(user).then((plan) => setPlan(plan));
    }
  }, [user?.teamId]);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-300 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                General
              </h2>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className="w-full sm:w-1/3 sm:pr-16">
            <AccountMenu />
          </div>
          <main className="hidden sm:block w-2/3 mx-auto bg-white overflow-hidden shadow rounded-lg">
            <div className="mt-5 pt-5 px-4 py-5 sm:p-6">
              <dl>
                <div className=" sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Email verified
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.emailVerified ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Team ID
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.teamId}
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Team Owner
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.isTeamOwner ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Plan
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <PlanPill />
                  </dd>
                </div>
                <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <dt className="text-sm leading-5 font-medium text-gray-600">
                    Photo
                  </dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      {user.avatarUrl ? (
                        <span className="inline-block relative">
                          <img
                            className="h-12 w-12 object-cover rounded-full"
                            src={user.avatarUrl}
                            alt={user.name}
                          />
                        </span>
                      ) : (
                        <svg
                          className="h-12 w-12 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 border-t border-gray-200 pt-5">
                <div className="flex justify-end">
                  <span className="rounded-md shadow-sm">
                    <Link href="/account/edit">
                      <a href="">
                        <Button title="Edit" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
