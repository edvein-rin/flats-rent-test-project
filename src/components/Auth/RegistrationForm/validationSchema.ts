import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  fullName: yup
    .string()
    .matches(
      /^\p{Lu}\p{Ll}+(?: \p{Lu}\p{Ll}+)+$/u,
      'Please enter a valid full name',
    )
    .required('Full name is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(12, 'Password should be of a minimum 12 characters length.'),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords should match.')
    .required('Please repeat password.'),
});

export default validationSchema;
