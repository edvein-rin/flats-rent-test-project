import React from 'react';
import Stack from '@mui/material/Stack';

import { Flat } from '../../../../types';
import FlatCard from '../FlatCard';

export interface FlatsListProps {
  flats: Flat[];
}

const FlatsList: React.FC<FlatsListProps> = ({ flats }) => {
  return (
    <Stack spacing={4}>
      {flats.map((flat) => (
        <FlatCard key={flat.id} {...flat} />
      ))}
    </Stack>
  );
};

export default FlatsList;
