import React from 'react';
import MaterialTextField, {
  TextFieldProps as MaterialTextFieldProps,
} from '@mui/material/TextField';

const TextField: React.FC<MaterialTextFieldProps> = (props) => (
  <MaterialTextField variant="filled" fullWidth {...props} />
);

export default TextField;
