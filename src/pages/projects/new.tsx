import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import Button from 'components/elements/Button';
import Link from 'next/link';
import ProjectForm from 'components/forms/ProjectForm';

const DashboardPage: React.FC = () => {
  const { user } = useRequireAuth();
  if (!user) return null;

  const breadCrumbs = {
    back: {
      path: '/projects',
      text: 'Back',
    },
    first: {
      path: '/projects',
      text: 'projects',
    },
    second: {
      path: '/projects/new',
      text: 'New',
    },
  };

  return (
    <Layout>
      <div className="max-w-3xl px-4 py-10 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="pb-4 pl-3 mb-6 border-b-2 border-gray-300 sm:py-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                New project
              </h2>
            </div>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow ">
          <div className="px-4 py-5 sm:p-6">
            <ProjectForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
