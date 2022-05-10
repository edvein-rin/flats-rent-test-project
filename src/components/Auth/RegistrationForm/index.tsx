import React, { useContext, useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useFormik, FormikValues, FormikHelpers } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';

import { UIContext } from '../../Unknown/UIContext';
import PasswordField from '../../Unknown/PasswordField';

import validationSchema from './validationSchema';

interface RegistrationFormValues extends FormikValues {
  email: string;
  fullName: string;
  password: string;
  repeatedPassword: string;
}
type RegistrationFormHelpers = FormikHelpers<RegistrationFormValues>;

const RegistrationForm: React.FC = () => {
  const auth = useAuth();
  const { showErrorAlert, setSnackbar } = useContext(UIContext);

  const handleSubmit = useCallback(
    async (
      { email, password, fullName }: RegistrationFormValues,
      { setSubmitting }: RegistrationFormHelpers,
    ) => {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        if (!user) throw Error('No user exception');

        try {
          await user.updateProfile({ ...user, displayName: fullName });
        } catch (error: unknown) {
          showErrorAlert(error);
        } finally {
          setSnackbar((handleClose) => (
            <Snackbar
              open
              message={`Welcome on board ${String.fromCodePoint(0x1f680)}`}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              onClose={handleClose}
            />
          ));
        }
      } catch (error: unknown) {
        showErrorAlert(error);
      } finally {
        setSubmitting(false);
      }
    },
    [showErrorAlert, setSnackbar, auth],
  );

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      repeatedPassword: '',
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
          Registration
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <TextField
            id="fullName"
            name="fullName"
            label="Full name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            fullWidth
          />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <PasswordField
            id="repeatedPassword"
            name="repeatedPassword"
            label="Repeat password"
            value={formik.values.repeatedPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repeatedPassword &&
              Boolean(formik.errors.repeatedPassword)
            }
            helperText={
              formik.touched.repeatedPassword && formik.errors.repeatedPassword
            }
            fullWidth
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            Registration
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
