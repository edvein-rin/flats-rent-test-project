import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import sideImageSrc from './side-image.png';
import sideImageSrc2x from './side-image@2x.png';
import sideImageSrc3x from './side-image@3x.png';

const useStyles = makeStyles(() => ({
  root: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));

const SideImage: React.FC = (props) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      component="img"
      alt="An office building"
      srcSet={`${sideImageSrc} ${sideImageSrc2x} 2x ${sideImageSrc3x} 3x`}
      src={sideImageSrc}
      {...props}
    />
  );
};

export default SideImage;
