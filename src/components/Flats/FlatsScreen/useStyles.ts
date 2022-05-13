import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(3),
  },
  searchBarWrapper: {
    paddingRight: theme.spacing(6),
    width: '100%',
    maxWidth: 580,
    position: 'fixed',
    zIndex: theme.zIndex.appBar,
    background: theme.palette.common.white,
  },
  searchBarOffset: {
    minHeight: 56,
  },
  title: {
    fontWeight: 600,
  },
}));

export default useStyles;
