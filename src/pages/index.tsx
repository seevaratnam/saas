import SideBar from 'components/home/SideBarLayout';
import { db } from 'config/firebase';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

const HomePage: NextPage<any> = ({ pages }) => {
  const { push } = useRouter();

  if (process.browser && pages.length && pages[0].slug) {
    push(`/docs/${pages[0].slug}`);
  }

  return (
    <SideBar pages={pages}>
      <main
        className="relative z-0 flex-1 overflow-y-auto focus:outline-none"
        tabIndex={0}
      >
        <div className="pt-2 pb-6 md:py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900"></h1>
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"></div>
        </div>
      </main>
    </SideBar>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let project = {} as any;
  const docRef = db.collection('projects').doc('serverless-saas');

  await docRef.get().then(function (doc) {
    if (doc.exists) {
      project = { id: doc.id, ...doc.data() };
    }
  });

  const pages = [];

  await docRef
    .collection('pages')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          pages.push({ id: doc.id, ...doc.data() });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  const sortedPages = [];
  project.sortedPageIds?.map((id) => {
    const page = pages.find((page) => page.id === id);
    if (page) {
      sortedPages.push(page);
    }
  });

  return { props: { project, pages: sortedPages } };
};

export default HomePage;
