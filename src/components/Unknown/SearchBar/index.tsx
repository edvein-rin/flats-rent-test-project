import React, { useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, TextField, TextFieldProps } from '@mui/material';

import useStyles from './useStyles';

export type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  options?: string[];
} & TextFieldProps;

const SearchBar: React.FC<Props> = ({
  label,
  inputValue,
  setInputValue,
  value,
  setValue,
  options,
  ...restProps
}) => {
  const classes = useStyles();

  const handleValueChange = useCallback(
    (_, newValue: string) => {
      setValue(newValue);
    },
    [setValue],
  );

  const handleInputValueChange = useCallback(
    (_, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [setInputValue],
  );

  const onSearchIconClick = () => {
    setValue(inputValue);
  };

  return (
    <Autocomplete
      options={options ?? []}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      value={value}
      onChange={handleValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className={classes.searchIconButton}
                  onClick={onSearchIconClick}
                >
                  <SearchIcon />
                </IconButton>
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
