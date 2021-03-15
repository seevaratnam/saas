import * as functions from 'firebase-functions';
import { addTeamMember, createTeam } from '../teams';
import { sendWelcomeEmail } from '../emails';
import { db } from '../config';

/**
 * On user create, check if teamId is present and if so, update the
 * users array of the corresponding team
 */
export const onUserCreate = functions.firestore
  .document('/users/{documentId}')
  .onCreate(async (snap, context) => {
    const user = snap.data();

    // If the teamId is present, that means the user signed up from a team invite mail
    if (user.teamId) {
      await addTeamMember(user);

      // Here, you could also send an email to the owner to inform about team member joining
    } else {
      await createTeam(user);
    }

    await sendWelcomeEmail(user);

    return { status: 'success' };
  });

/**
 * Updates the user document non-destructively
 */
export const updateUser = async (
  uid: string,
  data: { [key: string]: any }
): Promise<FirebaseFirestore.WriteResult> => {
  return await db.collection('users').doc(uid).set(data, { merge: true });
};
