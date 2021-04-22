import React from 'react'
import { Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Header from '../../../layouts/Posts/Header';
import DetailComponent from '../../../components/Posts/Detail';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			width: '80%',
			margin: '0 auto'
		}
	}),
);

const Detail = () => {
	const classes = useStyles();
	return (
		<>
			<Header />
			<Grid
				container spacing={3}
				className={classes.main}
			>
				<DetailComponent />
			</Grid>
		</>
	)
}

export default Detail