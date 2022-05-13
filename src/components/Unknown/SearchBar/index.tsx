import React, { useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, TextFieldProps } from '@mui/material';

export type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options?: string[];
} & TextFieldProps;

const SearchBar: React.FC<Props> = ({
  label,
  value,
  setValue,
  options,
  ...restProps
}) => {
  const handleChange = useCallback(
    (_, newValue: string) => {
      setValue(newValue);
    },
    [setValue],
  );

  return (
    <Autocomplete
      options={options || []}
      inputValue={value}
      onInputChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          {...restProps}
        />
      )}
      disableClearable
      multiple={false}
      freeSolo
    />
  );
};

export default SearchBar;
