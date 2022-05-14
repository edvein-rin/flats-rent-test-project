import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import useStyles from './useStyles';

export interface Props {
  address: string;
  description?: string;
  dailyPriceUsd: number;
  photoUrl: string;
  onDetailsButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected: boolean;
}

const FlatCard: React.FC<Props> = ({
  address,
  description,
  dailyPriceUsd,
  photoUrl,
  onDetailsButtonClick,
  selected,
}) => {
  const classes = useStyles();
  const hasDescription = !!description;

  return (
    <Card
      className={classes.root}
      variant={selected ? 'outlined' : 'elevation'}
    >
      <Box className={classes.imageWrapper}>
        <img className={classes.image} alt="" src={photoUrl} />
      </Box>
      <Box className={classes.infoBlock}>
        <Typography className={classes.dailyPrice} variant="h6">
          ${dailyPriceUsd} / night
        </Typography>
        <Typography className={classes.address} variant="caption">
          {address}
        </Typography>
        {hasDescription && (
          <Typography className={classes.description}>{description}</Typography>
        )}
        <Box className={classes.spacer} />
        <Box>
          <Button variant="outlined" onClick={onDetailsButtonClick}>
            Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default FlatCard;
