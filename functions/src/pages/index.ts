import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { db } from '../config';

/**
 * On create of a page save the ID to the
 on the project document
 */
export const onPageCreate = functions.firestore
  .document('/projects/{projectId}/pages/{pageId}')
  .onCreate((snap) => {
    return db
      .collection('projects')
      .doc(snap.data().projectId)
      .update({
        sortedPageIds: admin.firestore.FieldValue.arrayUnion(snap.id),
      });
  });

/**
 * On delete of a page remove the ID from the
 on the project document
 */
export const onPageDelete = functions.firestore
  .document('/projects/{projectId}/pages/{pageId}')
  .onDelete((snap) => {
    return db
      .collection('projects')
      .doc(snap.data().projectId)
      .update({
        sortedPageIds: admin.firestore.FieldValue.arrayRemove(snap.id),
      });
  });
