import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  sideBlock: {
    height: '100%',
    [theme.breakpoints.up('xs')]: { display: 'none' },
    [theme.breakpoints.up('md')]: { display: 'block' },
    overflow: 'hidden',
  },
  main: {
    height: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  underlay: {
    alignItems: 'center',
  },
  underlayTitle: {
    fontWeight: 600,
  },
}));

export default useStyles;
