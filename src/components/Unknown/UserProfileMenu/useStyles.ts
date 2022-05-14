import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileButton: {
    color: 'inherit',
  },
  avatar: {
    backgroundColor: theme.palette.grey[400],
  },
}));

export default useStyles;
