import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import Button from 'components/elements/Button';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { db } from 'config/firebase';

const DashboardPage: React.FC<any> = ({ projects }) => {
  const { user } = useRequireAuth();

  const breadCrumbs = {
    back: {
      path: '/projects',
      text: 'Back',
    },
    first: {
      path: '/projects',
      text: 'projects',
    },
  };

  if (!user) return null;

  const greetUser = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return `Good morning, ${user.name}`;
    }
    if (currentHour < 18) {
      return `Good afternoon, ${user.name}`;
    }
    return `Good evening, ${user.name}`;
  };

  return (
    <Layout>
      <div className="max-w-6xl px-4 py-10 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="pb-4 pl-3 mb-6 border-b-2 border-gray-300 sm:py-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                {greetUser()}
              </h2>
            </div>
            <Link href="/projects/new">
              <a href="">
                <Button title="Create project" />
              </a>
            </Link>
          </div>
        </header>
        <div className="h-48 overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            You have no projects. Create one to start building your
            documentation.
          </div>
          {projects?.map((project) => (
            <Link href={`/projects/${project.id}`}>
              <a href="">{project.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = [];

  await db
    .collection('projects')
    .where('teamId', '==', 'LZHrBZYVjJN19kMcxkeRBHuNCQx2')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        if (doc.exists) {
          projects.push({ id: doc.id, ...doc.data() });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return { props: { projects } };
};

export default DashboardPage;
