import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

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
  },
  imageWrapper: {
    overflow: 'hidden',
    height: '100%',
    width: '50%',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  infoBlock: {
    height: '100%',
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

export default useStyles;
