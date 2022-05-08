import React, { useContext, useCallback } from 'react';
import { useFirebaseApp } from 'reactfire';
import { useFormik, FormikValues, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { UIContext } from '../../Unknown/UIContext';
import PasswordField from '../../Unknown/PasswordField';

interface LoginFormValues extends FormikValues {
  email: string;
  password: string;
}
type LoginFormHelpers = FormikHelpers<LoginFormValues>;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const LoginForm: React.FC = () => {
  const history = useHistory();
  const auth = useFirebaseApp().auth();
  const { setAlert } = useContext(UIContext);

  const handleSubmit = useCallback(
    async (
      { email, password }: LoginFormValues,
      { setSubmitting }: LoginFormHelpers,
    ) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [setAlert, auth, history],
  );

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Box width="100%" maxWidth={375}>
      <Box py={4}>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontSize={40}
          letterSpacing={-1.5}
          align="center"
          color="common.black"
        >
          Login
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <PasswordField
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
