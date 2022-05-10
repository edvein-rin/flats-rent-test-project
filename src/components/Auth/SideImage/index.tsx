import React from 'react';
import Box from '@mui/material/Box';

import sideImageSrc from './side-image.png';
import sideImageSrc2x from './side-image@2x.png';
import sideImageSrc3x from './side-image@3x.png';

const SideImage: React.FC = (props) => (
  <Box
    component="img"
    sx={{
      objectFit: 'cover',
    }}
    alt="An office building"
    srcSet={`${sideImageSrc} ${sideImageSrc2x} 2x ${sideImageSrc3x} 3x`}
    src={sideImageSrc}
    height="100%"
    width="100%"
    {...props}
  />
);

export default SideImage;
