import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 375,
  },
  header: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  headerText: {
    fontWeight: 'bold',
    letterSpacing: -1.5,
    textAlign: 'center',
    color: theme.palette.common.black,
  },
}));

export default useStyles;
