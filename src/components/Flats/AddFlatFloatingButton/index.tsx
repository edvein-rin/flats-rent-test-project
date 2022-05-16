import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import useStyles from './useStyles';
import AddFlatDialog from '../AddFlatDialog';

const AddFlatFloatingButton: React.FC = () => {
  const classes = useStyles();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Fab
        className={classes.root}
        variant="extended"
        color="primary"
        area-label="add-flat"
        onClick={openDialog}
      >
        <AddIcon className={classes.icon} />
        <Typography fontWeight={500}>Add flat</Typography>
      </Fab>
      <AddFlatDialog open={isDialogOpen} onClose={closeDialog} />
    </>
  );
};

export default AddFlatFloatingButton;
