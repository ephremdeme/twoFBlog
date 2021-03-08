import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
	Theme,
	Grid,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

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

const Toolbar = ({className, ...rest}: any) => {
	const classes = useStyles();
	const { url } = useRouteMatch();

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Box>
				<Card variant="outlined" color="default">
					<Box m={3}>
						<Grid container spacing={3} justify="space-between" alignItems="center">
							<Grid item lg={6} md={6} xs={12}>
								<Paper variant="outlined" component="form" className={classes.root}>
									<IconButton
										type="submit"
										className={classes.iconButton}
										aria-label="search">
										<SearchIcon />
									</IconButton>
									<InputBase
										className={classes.input}
										placeholder="Search Products"
										inputProps={{'aria-label': 'search product'}}
									/>
								</Paper>
							</Grid>
							<Grid item lg={4} md={6} xs={12}>
								<Button component={Link} to={`${url}/create`} variant="outlined" disableElevation>
									Add Product
								</Button>
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
