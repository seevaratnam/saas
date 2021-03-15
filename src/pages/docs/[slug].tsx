import SideBar from 'components/home/SideBarLayout';
import { db } from 'config/firebase';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import ReactMarkdown from 'react-markdown';

const HomePage: NextPage<any> = ({ pages, currentPage }) => {
  return (
    <SideBar pages={pages}>
      <main
        className="relative z-0 flex-1 overflow-y-auto focus:outline-none"
        tabIndex={0}
      >
        <div className="p-8">
          <div className="px-4 mx-auto prose max-w-7xl sm:px-6 md:px-8">
            <ReactMarkdown source={currentPage.content} />
          </div>
        </div>
      </main>
    </SideBar>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = [];
  const sortedPages = [];
  let currentPage = {};
  let project = {} as any;

  const docRef = db.collection('projects').doc('serverless-saas');

  await docRef.get().then(function (doc) {
    if (doc.exists) {
      project = { id: doc.id, ...doc.data() };
    }
  });

  await docRef
    .collection('pages')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        if (doc.exists) {
          pages.push({ id: doc.id, ...doc.data() });
          if (doc.data().slug === params.slug) {
            currentPage = { id: doc.id, ...doc.data() };
          }
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

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

  project.sortedPageIds?.map((id) => {
    const page = pages.find((page) => page.id === id);
    if (page) {
      sortedPages.push(page);
    }
  });

  return {
    props: {
      pages: sortedPages,
      currentPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = [];
  const docRef = db.collection('projects').doc('serverless-saas');

  await docRef
    .collection('pages')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        if (doc.exists) {
          pages.push({ id: doc.id, ...doc.data() });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  const paths = pages.map((page) => {
    return `/docs/${page.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
};

export default HomePage;
