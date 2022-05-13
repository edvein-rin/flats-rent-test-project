import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  flatsButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
}));

export default useStyles;
