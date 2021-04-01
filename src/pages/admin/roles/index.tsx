import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    minHeight: '100vh',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function GroupOrientation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} lg={4}>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined primary button group"
        >
          <Button>ADMIN</Button>
          <Button>EDITOR</Button>
          <Button>BLOGGER</Button>
          <Button>CUSTOMER_SERVICE</Button>
          <Button>USER</Button>
          <Button>GUEST</Button>
          <Button>SHOPE_ADMIN</Button>
          <Button>SELLER</Button>
        </ButtonGroup>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box fontWeight={500} fontSize="1.3rem" >
            Role Settings
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
