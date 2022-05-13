import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
  },
  headerOffset: {
    minHeight: 64,
  },
  menuButton: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

export default useStyles;
