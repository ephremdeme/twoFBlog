import React from 'react';
import clsx from 'clsx';
import {
	Box,
	makeStyles,
	Theme,
	Tooltip,
	Badge,
	withStyles,
	createStyles,
	fade,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import { RootState } from 'app/store';
import { setFilterableProducts } from 'features/product';
import UnlockAccess from 'utils/UnlockAccess';
import { UserRole } from 'features/auth/types';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		margin: '2rem 0px',
	},
	search: {
		position: 'relative',
		borderRadius: 10,
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		border: `${theme.palette.type === 'dark' ? "1px solid #555" : "1px solid #aaa"}`,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		width: '100%',
		color: 'inherit',
		fontSize: '.8rem',
		padding: '5px',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '18ch',
			'&:focus': {
				width: '25ch',
			},
		},
	}
}));

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -4,
			top: 13,
			border: `1px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
			margin: ".3rem 5rem"
		},
	})
)(Badge);

type IProps = {
	backbtn?: boolean;
	title?: string;
	className?: any;
};

const ProductAppBar = (props: IProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { className } = props;
	const role = useSelector((state: RootState) => state.auth.role);

	const handleFilterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilterableProducts(e.target.value));
	};

	return (
		<div className={clsx(classes.root, className)}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Box flexGrow={1} mx={3}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search products…"
							onChange={handleFilterProducts}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					
					<UnlockAccess request={[UserRole.ADMIN]}>
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
					</UnlockAccess>
					)}
				</Box>
			</Box>
		</div>
	);
};

export default ProductAppBar;
