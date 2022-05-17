import admin from 'firebase-admin';
import { https } from 'firebase-functions';
import Joi from 'joi';

const flatValidationScheme = Joi.object({
  address: Joi.string().required(),
  cityName: Joi.string().required(),
  description: Joi.string().max(300),
  dailyPriceUsd: Joi.number().positive().max(1000000).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  photoUrl: Joi.string().required(),
});

export const createFlat = https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new https.HttpsError(
      'unauthenticated',
      'Only authenticated users are allowed to publish flats.',
    );
  }

  const isDataValidFlat =
    flatValidationScheme.validate(data).error === undefined;

  if (isDataValidFlat) {
    const flatDoc = admin.firestore().collection('flats').doc();
    const flat = {
      id: flatDoc.id,
      ...data,
      publishedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    await flatDoc.set(flat, { merge: true });

    return flat;
  }

  throw new https.HttpsError('invalid-argument', 'The flat is not valid.');
});

export default { createFlat };
