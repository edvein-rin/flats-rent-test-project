import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Flat } from '../../../../types';
import SearchBar from '../../Unknown/SearchBar';
import FlatsList from '../FlatsList';
import getPlacePredictions from '../../../common/getPlacePredictions';
import { UIContext } from '../../Unknown/UIContext';

import useStyles from './useStyles';

const FlatsScreen: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const firestore = useFirestore();
  const { showErrorAlert } = useContext(UIContext);

  const [searchParams, setSearchParams] = useState(
    qs.parse(window.location.search, { ignoreQueryPrefix: true }),
  );

  const [city, setCity] = useState(
    (searchParams.city as string | undefined) ?? '',
  );
  const [searchBarInputValue, setSearchBarInputValue] = useState(city);

  const [cityPredictions, setCityPredictions] = useState<string[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (searchBarInputValue === '') {
      setCity('');
    }
    getPlacePredictions(searchBarInputValue).then((predictions) => {
      setCityPredictions(
        Array.from(
          new Set(
            predictions.map(
              (prediction) => prediction.structured_formatting.main_text,
            ),
          ),
        ),
      );
    });
  }, [searchBarInputValue]);

  useEffect(() => {
    setSearchParams((oldSearchParams) =>
      city ? { ...oldSearchParams, city } : {},
    );
  }, [city]);

  useEffect(() => {
    const formattedSearchParams = `?${qs.stringify(searchParams)}`;

    if (window.location.search !== formattedSearchParams) {
      history.replace(`${window.location.pathname}${formattedSearchParams}`);
    }
  }, [history, searchParams]);

  const flatsQuery = firestore
    .collection('flats')
    .orderBy('publishedAt', 'desc')
    .limit(20);
  const flatsQueryWithCityFilter = city
    ? flatsQuery.where('cityName', '==', city)
    : flatsQuery;
  const {
    status,
    data: flats,
    error,
  } = useFirestoreCollectionData<Flat>(flatsQueryWithCityFilter, {
    idField: 'id',
  });

  if (status === 'error') {
    showErrorAlert(error);
    return null;
  }

  const isLoaded = status === 'success';

  return (
    <Stack className={classes.root} spacing={5}>
      <Box>
        <Box className={classes.searchBarWrapper}>
          <SearchBar
            label="City"
            value={city}
            setValue={setCity}
            inputValue={searchBarInputValue}
            setInputValue={setSearchBarInputValue}
            options={cityPredictions}
            fullWidth
          />
        </Box>
        <Box className={classes.searchBarOffset} />
      </Box>
      <Typography className={classes.title} variant="h5">
        Flats to rent
      </Typography>
      {isLoaded && <FlatsList flats={flats} />}
    </Stack>
  );
};

export default FlatsScreen;
