import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';

import PageForm from 'components/forms/PageForm';
import { db } from 'config/firebase';
import { GetServerSideProps } from 'next';
import Button from 'components/elements/Button';
import { useRouter } from 'next/router';

const EditPage: React.FC<any> = ({ page }) => {
  const { push } = useRouter();
  const { user } = useRequireAuth();
  if (!user) return null;

  const breadCrumbs = {
    back: {
      path: '/projects',
      text: 'Back',
    },
    first: {
      path: '/projects',
      text: 'Projects',
    },
    second: {
      path: `/projects/${page.projectId}`,
      text: 'Pages',
    },
    third: {
      path: `/projects/${page.projectId}/pages/new`,
      text: 'New',
    },
  };

  const deletePage = () => {
    db.collection('projects')
      .doc(page.projectId)
      .collection('pages')
      .doc(page.id)
      .delete()
      .then(function () {
        push(`/projects/${page.projectId}`);
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <Layout>
      <div className="max-w-6xl px-4 py-10 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="pb-4 pl-3 mb-6 border-b-2 border-gray-300 sm:py-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                New project
              </h2>
            </div>
            <div>
              <Button title="Delete Page" onClick={() => deletePage()} />
            </div>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow ">
          <div className="px-4 py-5 sm:p-6">
            <PageForm page={page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  let page = {};
  const { projectId, pageId } = params;

  console.log(params);

  const docRef = db
    .collection('projects')
    .doc(projectId)
    .collection('pages')
    .doc(pageId);

  await docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        page = { id: doc.id, ...doc.data(), projectId };
      }
    })
    .catch(function (error) {
      console.log('Error getting document: ', error);
    });

  return { props: { page } };
};

export default EditPage;
