import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import PricingCard from 'components/dashboard/PricingCard';
import StripeBillingButton from 'components/dashboard/BillingButton';
import { PRO_PLAN, HOBBY_PLAN } from 'config/stripe';

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
};

const Billing: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-300 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                Billing
              </h2>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className="w-full sm:w-1/3 sm:pr-16">
            <AccountMenu />
          </div>
          <main className="hidden sm:block w-2/3 mx-auto">
            {!auth.user?.isPro && !auth.user?.isHobby && (
              <div className="grid gap-4 grid-cols-2">
                <PricingCard plan={HOBBY_PLAN} />
                <PricingCard plan={PRO_PLAN} />
              </div>
            )}
            {(auth.user.isPro || auth.user.isHobby) && (
              <div>
                <div className="rounded-md bg-green-100 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm leading-5 font-medium text-green-800">
                        Your
                        <span className="font-bold">
                          {auth.user.isPro ? ' Pro ' : ' Hobby '}
                        </span>
                        plan is currently active
                      </h3>
                      <div className="mt-2 text-sm leading-5 text-green-700">
                        <p>
                          You have full access to all feature and
                          functionalities. If you which to update your
                          subscription or payment method, visit the billing
                          portal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-5 px-4 py-5 sm:p-6 bg-white overflow-hidden shadow rounded-lg">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Manage your subscription
                  </h3>
                  <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div className="text-sm leading-5 text-gray-500">
                      <p>
                        {`You can update or cancel your subscription any time. Click
                    the "Manage subscription" button to go to the customer
                    portal where you can update your subscription or change your
                    preferred payment method.`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                      <StripeBillingButton />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Billing;
