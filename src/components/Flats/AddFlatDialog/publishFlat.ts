import firebase from 'firebase';

import { Flat } from '../../../../types';

export const publishFlat = async (
  flatsCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  flat: Omit<Flat, 'id' | 'publishedAt'>,
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> =>
  flatsCollection.add({
    ...flat,
    // TEMP
    publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

export default publishFlat;
