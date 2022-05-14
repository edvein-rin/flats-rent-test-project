import React, { useContext, useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useFormik, FormikValues, FormikHelpers } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { UIContext } from '../../Unknown/UIContext';
import PasswordField from '../../Unknown/PasswordField';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface LoginFormValues extends FormikValues {
  email: string;
  password: string;
}
type LoginFormHelpers = FormikHelpers<LoginFormValues>;

const LoginForm: React.FC = () => {
  const classes = useStyles();

  const auth = useAuth();
  const { showErrorAlert } = useContext(UIContext);

  const handleSubmit = useCallback(
    async (
      { email, password }: LoginFormValues,
      { setSubmitting }: LoginFormHelpers,
    ) => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error: unknown) {
        showErrorAlert(error);
      } finally {
        setSubmitting(false);
      }
    },
    [showErrorAlert, auth],
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
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.headerText} variant="h3">
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
