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
import { Box } from '@material-ui/core';

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
			position: 'fixed',
			bottom: '10px',
			right: '10px',
			background: 'rgba(0,0,0,0.2)',
			padding: '.4rem 1rem',
			borderRadius: 25,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		bottom: {
			color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
		},
		top: {
			color: theme.palette.type === 'light' ? '#1a90dd' : '#1a92ff',
			animationDuration: '240ms',
			position: 'relative',
			left: 0,
		},
		circle: {
			strokeLinecap: 'round',
		},
	})
);

interface IProps {
	title?: string;
	size?: number;
	thickness?: number;
	props: CircularProgressProps;
}

const MiniLoading = ({ title = "Refreshing...", size = 25, thickness = 3, ...props }: CircularProgressProps) => {
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
				<Box ml={1} fontWeight={400} fontSize="0.8rem">
					{title}
				</Box>
			</div>
		</div>
	);
};

export default MiniLoading;
