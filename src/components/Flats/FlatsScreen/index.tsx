import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { GoogleMap } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Flat } from '../../../../types';
import { getPlacePredictions } from '../../../common/getPlacePredictions';
import { formatSearchParams } from '../../../common/formatSearchParams';
import SearchBar from '../../Unknown/SearchBar';
import { UIContext } from '../../Unknown/UIContext';
import FlatsList from '../FlatsList';
import AddFlatFloatingButton from '../AddFlatFloatingButton';

import useStyles from './useStyles';

export interface FlatsScreenProps {
  selectedFlatId?: string;
}

const FlatsScreen: React.FC<FlatsScreenProps> = ({ selectedFlatId }) => {
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

  const isThereSelectedFlat = !!selectedFlatId;

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
    const formattedSearchParams = formatSearchParams(searchParams);

    if (window.location.search !== formattedSearchParams) {
      if (isThereSelectedFlat) {
        history.push(`/flats${formattedSearchParams}`);
      } else {
        history.replace(`${window.location.pathname}${formattedSearchParams}`);
      }
    }
  }, [history, searchParams, isThereSelectedFlat]);

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

  const areFlatsLoaded = status === 'success';
  const selectedFlat = flats?.find((flat) => flat.id === selectedFlatId);
  const isSelectedFlatLoaded = !!selectedFlat;

  const mapMessage = (() => {
    if (!isThereSelectedFlat) return 'No flat selected';
    if (!areFlatsLoaded) return 'Loading flat details..';
    if (!isSelectedFlatLoaded) return 'Failed to load the flat';
    return undefined;
  })();
  const isMapMessageVisible = !!mapMessage;
  const isMapVisible = !isMapMessageVisible;

  const onFlatDetailsButtonClick = (flat: Flat) => {
    const formattedSearchParams = formatSearchParams(searchParams);
    history.push(`/flats/${flat.id}${formattedSearchParams}`);
  };

  return (
    <>
      <Stack className={classes.root} direction="row">
        <Stack className={classes.main} spacing={5}>
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
          {areFlatsLoaded && (
            <FlatsList
              flats={flats}
              onFlatDetailsButtonClick={onFlatDetailsButtonClick}
              selectedFlatId={selectedFlatId}
            />
          )}
        </Stack>
        <Box className={classes.map}>
          {isMapMessageVisible && (
            <Typography variant="h6" fontWeight={600} color="common.white">
              {mapMessage}
            </Typography>
          )}
          {isMapVisible && selectedFlat && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              zoom={10}
              center={{
                lat: selectedFlat.latitude,
                lng: selectedFlat.longitude,
              }}
            />
          )}
        </Box>
      </Stack>
      <AddFlatFloatingButton />
    </>
  );
};

export default FlatsScreen;
