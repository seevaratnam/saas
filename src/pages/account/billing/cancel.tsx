import Link from 'next/link';

import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import Button from 'components/elements/Button';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';

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
    path: '/account/billing',
    text: 'Billing',
  },
  third: {
    path: '/account/billing/success',
    text: 'Success',
  },
};

const Cancel: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                Account
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
              <h3 className="leading-6 font-medium text-gray-900">
                You did not successfully upgraded your plan. Please try again.
              </h3>
              <div className="mt-8 border-t border-gray-200 pt-5">
                <div className="flex justify-end">
                  <span className="rounded-md shadow-sm">
                    <Link href="/account/billing">
                      <Button title="Back" />
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

export default Cancel;
