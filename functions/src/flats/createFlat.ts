import admin from 'firebase-admin';
import { firestore } from 'firebase-functions';
import Joi from 'joi';

import { Flat } from '../../types/index';

const flatValidationScheme = Joi.object({
  address: Joi.string().required(),
  cityName: Joi.string().required(),
  description: Joi.string().max(300),
  dailyPriceUsd: Joi.number().positive().max(1000000).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  photoUrl: Joi.string().required(),
});

export const createFlat = firestore
  .document('flats/{id}')
  .onCreate((snap, context) => {
    const flat: Flat = {
      ...(snap.data() as Flat),
      id: context.params.id,
      publishedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    const isFlatValid = flatValidationScheme.validate(flat);

    const doc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
      snap.ref;

    if (isFlatValid) {
      return doc.set(flat, {
        merge: true,
      });
    }
    return doc.delete();
  });

export default { createFlat };
