import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Header from '../../../layouts/Posts/Header';
import PostListItem from '../../../components/Posts/PostListItem';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			width: '80%',
			margin: '0 auto'
		}
	}),
);

const Index = () => {
	const classes = useStyles();

	return (
		<>
			<Header />
			<Grid
				container spacing={3}
				className={classes.main}
			>
				<PostListItem />
			</Grid>
		</>
	)
}

export default Index