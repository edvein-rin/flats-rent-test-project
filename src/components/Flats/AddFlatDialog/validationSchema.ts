import * as yup from 'yup';

const validationSchema = yup.object({
  address: yup.string().required('Address is required.'),
  pricePerNight: yup
    .number()
    .positive()
    .required('Price per night is required.'),
  description: yup.string(),
});

export default validationSchema;
