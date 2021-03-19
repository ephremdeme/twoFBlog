import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Box, Button, Card, makeStyles, Theme, Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useRouteMatch} from 'react-router';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// import {setFilterableProducts} from '../../features/product';

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

type IProps = {
	backbtn?: boolean;
	title?: string;
	className: any;
};

const Toolbar = (props: IProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {backbtn, title, className} = props;
	const {url} = useRouteMatch();

	const handleFilterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		// dispatch(setFilterableProducts(e.target.value));
	};

	return (
		<div className={clsx(classes.root, className)}>
			<Box>
				<Card elevation={0} color="default">
					<Box m={2}>
						<Grid
							container
							spacing={3}
							justify="space-between"
							alignItems="center">
							<Grid item lg={6} md={6} xs={12}>
								{title ? (
									<h2>{title}</h2>
								) : (
									<Paper
										variant="outlined"
										component="form"
										className={classes.root}>
										<IconButton
											type="submit"
											className={classes.iconButton}
											aria-label="search">
											<SearchIcon />
										</IconButton>
										<InputBase
											onChange={handleFilterProducts}
											className={classes.input}
											placeholder="Search Products"
											inputProps={{'aria-label': 'search product'}}
										/>
									</Paper>
								)}
							</Grid>
							<Grid item lg={4} md={6} xs={12}>
								{backbtn ? (
									<Button
										component={Link}
										to={`/product`}
										variant="outlined"
										disableElevation>
										Back To Products
									</Button>
								) : (
									<Button
										component={Link}
										to={`${url}/create`}
										variant="outlined"
										disableElevation>
										Add Product
									</Button>
								)}
							</Grid>
						</Grid>
					</Box>
				</Card>
			</Box>
		</div>
	);
};

Toolbar.propTypes = {
	className: PropTypes.string,
};

export default Toolbar;
