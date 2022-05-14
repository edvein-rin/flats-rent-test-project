import React from 'react';
import Stack from '@mui/material/Stack';

import { Flat } from '../../../../types';
import FlatCard from '../FlatCard';

export interface FlatsListProps {
  flats: Flat[];
  selectedFlatId?: Flat['id'];
  onFlatDetailsButtonClick?: (flat: Flat) => void;
}

const FlatsList: React.FC<FlatsListProps> = ({
  flats,
  selectedFlatId,
  onFlatDetailsButtonClick,
}) => {
  return (
    <Stack spacing={4}>
      {flats.map((flat) => {
        const onDetailsButtonClick = onFlatDetailsButtonClick?.bind(null, flat);
        const isCardSelected = !!selectedFlatId && flat.id === selectedFlatId;

        return (
          <FlatCard
            key={flat.id}
            selected={isCardSelected}
            {...flat}
            onDetailsButtonClick={onDetailsButtonClick}
          />
        );
      })}
    </Stack>
  );
};

export default FlatsList;
