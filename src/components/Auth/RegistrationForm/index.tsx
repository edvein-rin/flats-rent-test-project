import React, { useContext, useCallback } from 'react';
import firebase from 'firebase';
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

interface RegistrationFormValues extends FormikValues {
  email: string;
  fullName: string;
  password: string;
  repeatedPassword: string;
}
type RegistrationFormHelpers = FormikHelpers<RegistrationFormValues>;

const RegistrationForm: React.FC = () => {
  const classes = useStyles();

  const auth = useAuth();
  const { showErrorAlert, setAlert } = useContext(UIContext);

  const updateUserDisplayName = useCallback(
    (user: firebase.User, displayName: string) => {
      try {
        return user.updateProfile({ ...user, displayName });
      } catch (error: unknown) {
        return new Promise<void>((resolve) => resolve(showErrorAlert(error)));
      }
    },
    [showErrorAlert],
  );

  const createUser = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        if (!user) throw Error('No user exception');

        await updateUserDisplayName(user, displayName);

        setAlert({
          show: true,
          simple: true,
          message: `Welcome on board ${String.fromCodePoint(0x1f680)}`,
          position: { vertical: 'bottom', horizontal: 'center' },
        });
      } catch (error: unknown) {
        showErrorAlert(error);
      }
    },
    [auth, showErrorAlert, setAlert, updateUserDisplayName],
  );

  const handleSubmit = useCallback(
    async (
      { email, password, fullName }: RegistrationFormValues,
      { setSubmitting }: RegistrationFormHelpers,
    ) => {
      await createUser(email, password, fullName);
      setSubmitting(false);
    },
    [createUser],
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
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.headerText} variant="h3">
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
