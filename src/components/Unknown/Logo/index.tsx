import React from 'react';

import { ReactComponent as LogoComponent } from './logo.svg';

const Logo: React.FC<React.ComponentProps<typeof LogoComponent>> = (props) => (
  <LogoComponent width={173} height={37} {...props} />
);

export default Logo;
