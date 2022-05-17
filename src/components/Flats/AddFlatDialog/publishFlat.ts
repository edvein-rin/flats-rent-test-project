import firebase from 'firebase';

import { Flat } from '../../../../types';

export const publishFlat = async (
  flat: Omit<Flat, 'id' | 'publishedAt'>,
): Promise<Flat> => {
  const createFlat = firebase.functions().httpsCallable('createFlat');
  return (await createFlat(flat)).data as Flat;
};

export default publishFlat;
