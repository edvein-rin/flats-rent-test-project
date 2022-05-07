import React, { useContext, useCallback, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import { useFormik, FormikValues, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { UIContext } from '../../Unknown/UIContext';

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
    <Box maxWidth={375}>
      <Box pb={{ xs: 5, md: '61px' }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontSize={40}
          letterSpacing={-1.5}
          lineHeight={{ md: '112px' }}
          align="center"
          color="common.black"
        >
          Login
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="filled"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Box py={{ xs: 3, md: '50px' }}>
          <TextField
            variant="filled"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
