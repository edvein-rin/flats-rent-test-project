import * as yup from 'yup';

const validationSchema = yup.object({
  address: yup.string().required('Address is required.'),
  pricePerNight: yup
    .number()
    .positive()
    .max(1000000)
    .required('Price per night is required.'),
  description: yup.string().max(300),
});

export default validationSchema;
