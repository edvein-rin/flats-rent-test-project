import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Flat } from '../../../../types';
import SearchBar from '../../Unknown/SearchBar';
import FlatsList from '../FlatsList';
import autocompletePlace from '../../../common/autocompletePlace';

import useStyles from './useStyles';

const FlatsScreen: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const firestore = useFirestore();
  const flatsQuery = firestore
    .collection('flats')
    .orderBy('publishedAt', 'desc')
    .limit(20);
  const { status, data: flats } = useFirestoreCollectionData<Flat>(flatsQuery, {
    idField: 'id',
  });

  const [searchParams, setSearchParams] = useState(
    qs.parse(window.location.search, { ignoreQueryPrefix: true }),
  );

  const [city, setCity] = useState(
    (searchParams.city as string | undefined) ?? '',
  );

  const [citySuggestions, setCitySuggestions] = useState<string[] | undefined>(
    undefined,
  );

  useEffect(() => {
    setSearchParams((oldSearchParams) =>
      city ? { ...oldSearchParams, city } : {},
    );
    autocompletePlace(city).then((suggestions) => {
      setCitySuggestions(suggestions);
    });
  }, [city]);

  useEffect(() => {
    history.replace(
      `${window.location.pathname.split('?')[0]}?${qs.stringify(searchParams)}`,
    );
  }, [history, searchParams]);

  if (status === 'loading') return null;

  const filteredFlats = city
    ? flats.filter((flat) => flat.cityName === city)
    : flats;

  return (
    <Stack className={classes.root} spacing={5}>
      <Box>
        <Box className={classes.searchBarWrapper}>
          <SearchBar
            label="City"
            value={city}
            setValue={setCity}
            options={citySuggestions}
            fullWidth
          />
        </Box>
        <Box className={classes.searchBarOffset} />
      </Box>
      <Typography className={classes.title} variant="h5">
        Flats to rent
      </Typography>
      <FlatsList flats={filteredFlats} />
    </Stack>
  );
};

export default FlatsScreen;
