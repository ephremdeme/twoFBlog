import React from 'react';
import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from '@material-ui/core/styles';
import CircularProgress, {
	CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const useStylesLoader = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'fixed',
			width: '100vw',
			height: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 500,
		},
		card: {
      position: 'relative',
			background: 'rgba(0,0,0,0.4)',
			width: '200px',
			height: '200px',
			borderRadius: 20,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			boxShadow: '0 0 10px rgba(0,0,0,0.2)',
			transform: 'translate(-120%, -50%)'
		},
		bottom: {
			color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
		},
		top: {
			color: theme.palette.type === 'light' ? '#1a90dd' : '#1a92ff',
			animationDuration: '280ms',
			position: 'relative',
			left: 0,
		},
		circle: {
			strokeLinecap: 'round',
		},
	})
);

interface IProps {
	size?: number;
	thickness?: number;
	props: CircularProgressProps;
}

const OverlayLoading = ({size=65, thickness=2, ...props}: CircularProgressProps) => {
	const classes = useStylesLoader();

	return (
		<div className={classes.root}>
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
		</div>
	);
};

export default OverlayLoading;
