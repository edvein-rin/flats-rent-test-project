import React from 'react';
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
  return (
    <Autocomplete
      options={options || []}
      inputValue={value}
      onInputChange={(e) =>
        setValue((e?.target as unknown as { value: string })?.value)
      }
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
    />
  );
};

export default SearchBar;
