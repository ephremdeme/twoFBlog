import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getGlobalLoading } from 'features/app';
import { Chat } from '@material-ui/icons';

const useStylesLoader = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      width: "100vw",
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      background: localStorage.getItem('theme') === "dark" ? "#212121" : "#fff" ,
      justifyContent: 'center',
      zIndex: 1500,
    },
    card: {
      position: 'relative',
      background: localStorage.getItem('theme') === "dark" ? "#212121" : "#fff" ,
      padding: '.4rem',
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: theme.palette.type === 'light' ? '#23B' : '#1a92ff',
      animationDuration: '290ms',
      position: 'relative',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
    msgContainer: {
      maxWidth: 300,
      margin: '-5vh auto 0',
      textAlign: "center",
    }
  })
);

interface IProps {
  size?: number;
  thickness?: number;
  props?: CircularProgressProps;
}

const GlobalLoader: React.FC<IProps> = ({ size = 20, thickness = 3, ...props }) => {
  const classes = useStylesLoader();
  const globalLoader = useSelector(getGlobalLoading);

  return (
    <div className={classes.root}>
      <Box className={classes.msgContainer}>
        <div className={classes.card}>
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={size}
            thickness={thickness}
            {...props}
          />
        </div>
        <Box mt={2} fontSize="1rem" fontWeight={500}>{globalLoader.msg}</Box>
      </Box>
    </div>
  );
};

export default GlobalLoader;
