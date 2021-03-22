import React from 'react';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	makeStyles,
	Theme,
	Grid,
	Tooltip,
	Badge,
	withStyles,
	createStyles,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useRouteMatch} from 'react-router';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import {RootState} from 'app/store';
import {UserRole} from 'features/user/types';
import {selectChartProductQty} from 'features/product';
// import {setFilterableProducts} from '../../../features/product';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
	},
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

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -4,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

type IProps = {
	backbtn?: boolean;
	title?: string;
	className?: any;
};

const ProductAppBar = (props: IProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {backbtn, title, className} = props;
	const {url} = useRouteMatch();
	const role = useSelector((state: RootState) => state.auth.role);
	const chartQty = useSelector(selectChartProductQty);

	const handleFilterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		// dispatch(setFilterableProducts(e.target.value));
	};

	return (
		<div className={clsx(classes.root, className)}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Box flexGrow={1}></Box>
				<Box alignSelf="flex-end">
					{role === UserRole.USER ||
						(role === UserRole.GUEST && (
							<Tooltip title="checkout chart">
								<IconButton
									aria-label="cart"
									component={Link}
									to={'/products/chart'}> 
									<StyledBadge badgeContent={chartQty} color="secondary">
										<ShoppingCartIcon />
									</StyledBadge>
								</IconButton>
							</Tooltip>
						))}
					{role === UserRole.ADMIN && (
						<>
							<Tooltip title="checkout orders">
								<IconButton
									aria-label="checkout orders"
									component={Link}
									to={'/products/orders'}>
									<ListAltIcon fontSize="small" />
								</IconButton>
							</Tooltip>
							<Tooltip title="add a prodcut">
								<IconButton
									aria-label="chart"
									component={Link}
									to={'/products/create'}>
									<AddIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						</>
					)}
				</Box>
			</Box>
			{/* <Box>
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
									<InputBase
										onChange={handleFilterProducts}
										className={classes.input}
										placeholder="Search Products"
										inputProps={{'aria-label': 'search product'}}
									/>
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
		 */}
		</div>
	);
};

export default ProductAppBar;
