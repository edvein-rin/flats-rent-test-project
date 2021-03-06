import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '45% 55%',
  },
  main: {
    height: '100%',
    padding: theme.spacing(3),
  },
  map: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
    position: 'sticky',
    top: 64,
    background: theme.palette.grey[400],
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
