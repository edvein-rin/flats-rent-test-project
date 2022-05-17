import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Flat } from '../../../../types';
import { getPlacePredictions } from '../../../common/getPlacePredictions';
import { getPlaceGeometry } from '../../../common/getPlaceGeometry';
import { UIContext } from '../../Unknown/UIContext';

import validationSchema from './validationSchema';
import { publishFlat } from './publishFlat';

interface AddFlatFormValues extends FormikValues {
  address: string;
  pricePerNight: string;
  description?: string;
}
type AddFlatFormHelpers = FormikHelpers<AddFlatFormValues>;

export interface AddFlatDialogProps extends DialogProps {
  onClose: () => void;
}

const AddFlatDialog: React.FC<AddFlatDialogProps> = (props) => {
  const { onClose } = props;

  const [addressInputValue, setAddressInputValue] = useState('');
  const [addressPredictions, setAddressPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  useEffect(() => {
    getPlacePredictions(addressInputValue).then((predictions) => {
      setAddressPredictions(predictions || [addressInputValue]);
    });
  }, [addressInputValue]);

  const history = useHistory();
  const { showErrorAlert, setAlert } = useContext(UIContext);

  const constructFlatToPublish = useCallback(
    async (
      address: string,
      pricePerNight: string,
      description?: string,
    ): Promise<Omit<Flat, 'id' | 'publishedAt'>> => {
      const addressPrediction = addressPredictions.find(
        (prediction) => prediction.description === address,
      ) as google.maps.places.AutocompletePrediction;

      const dailyPriceUsd = +pricePerNight;
      const photoUrl =
        'https://images.unsplash.com/photo-1627222339149-2d40cba04740' +
        '?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' +
        '&auto=format&fit=crop&w=687&q=100';
      const cityName = addressPrediction.structured_formatting.main_text;

      const geometry = await getPlaceGeometry(addressPrediction.place_id);

      if (!geometry.location) throw Error('No coordinates for this address');
      const latitude = geometry.location.lat();
      const longitude = geometry.location.lng();

      return {
        address,
        cityName,
        dailyPriceUsd,
        ...(description ? { description } : {}),
        latitude,
        longitude,
        photoUrl,
      };
    },
    [addressPredictions],
  );

  const handleSubmit = useCallback(
    async (
      { address, pricePerNight, description }: AddFlatFormValues,
      { setSubmitting, resetForm }: AddFlatFormHelpers,
    ) => {
      try {
        const flatToPublish = await constructFlatToPublish(
          address,
          pricePerNight,
          description,
        );

        const { id } = await publishFlat(flatToPublish);

        setAlert({
          show: true,
          simple: true,
          position: {
            horizontal: 'center',
            vertical: 'bottom',
          },
          message: 'Your flat has been successfully published',
        });
        resetForm();
        onClose();
        history.push(`/flats/${id}`);
      } catch (error: unknown) {
        showErrorAlert(error);
      } finally {
        setSubmitting(false);
      }
    },
    [constructFlatToPublish, history, onClose, setAlert, showErrorAlert],
  );

  const formik = useFormik<AddFlatFormValues>({
    initialValues: {
      address: '',
      pricePerNight: '',
      description: '',
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog {...props} onClose={handleClose}>
      <DialogTitle>New flat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in a simple form below to quickly add your flat to our platform.
          Don’t forget describing all benefits to make our users choosing your
          flat.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <Autocomplete
            getOptionLabel={(option) => option ?? ''}
            isOptionEqualToValue={(option, value) => {
              return value === '' || value === option;
            }}
            options={addressPredictions.map(
              (prediction) => prediction.description,
            )}
            inputValue={addressInputValue}
            onInputChange={(_, value) => setAddressInputValue(value)}
            value={formik.values.address}
            onChange={(_, value) => formik.setFieldValue('address', value)}
            renderInput={(params) => (
              <TextField
                autoFocus
                name="address"
                label="Address"
                type="text"
                variant="standard"
                margin="normal"
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                {...params}
              />
            )}
            disableClearable
            multiple={false}
          />
          <TextField
            name="pricePerNight"
            label="Price per night, $"
            value={formik.values.pricePerNight}
            onChange={formik.handleChange}
            error={
              formik.touched.pricePerNight &&
              Boolean(formik.errors.pricePerNight)
            }
            helperText={
              formik.touched.pricePerNight && formik.errors.pricePerNight
            }
            type="text"
            variant="standard"
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            type="text"
            variant="standard"
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formik.submitForm} disabled={formik.isSubmitting}>
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFlatDialog;
