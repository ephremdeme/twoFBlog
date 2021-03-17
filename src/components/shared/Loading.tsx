import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

const useStylesLoader = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: theme.palette.type === 'light' ? '#1a90dd' : '#1a92ff',
      animationDuration: '260ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

interface IProps {
  size?: number;
  thickness?: number;
  props: CircularProgressProps;
}

const Loading = ({
  size, thickness, ...props
}: CircularProgressProps) => {
  const classes = useStylesLoader();

  return (
    <div className={classes.root}>
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
  );
}


export default Loading