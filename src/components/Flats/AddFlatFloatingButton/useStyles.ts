import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
