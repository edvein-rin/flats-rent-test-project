import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 240,
    [theme.breakpoints.down('md')]: {
      height: 200,
    },
    maxWidth: 580,
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    '> *': {
      height: '100%',
    },
  },
  imageWrapper: {
    overflow: 'hidden',
    width: '50%',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  infoBlock: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  dailyPrice: {
    fontWeight: 600,
  },
  address: {
    marginTop: theme.spacing(1),
    color: theme.palette.grey[600],
  },
  description: {
    marginTop: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    fontSize: 8,
    color: theme.palette.grey[600],
  },
  spacer: {
    flexGrow: 1,
  },
}));

export interface Props {
  address: string;
  description?: string;
  dailyPriceUsd: number;
  photoUrl: string;
}

const FlatCard: React.FC<Props> = ({
  address,
  description,
  dailyPriceUsd,
  photoUrl,
}) => {
  const classes = useStyles();
  const hasDescription = !!description;

  return (
    <Card className={classes.root}>
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
          <Button variant="outlined">Details</Button>
        </Box>
      </Box>
    </Card>
  );
};

export default FlatCard;
