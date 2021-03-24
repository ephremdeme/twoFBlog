import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PriceTagFilter from './filters/PriceTagFilter';
import QtyFilter from './filters/QtyFilter';
import CatagoryFilter from './filters/CatagoryFilter';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { clearProductsFilter } from 'features/product'
import { useDispatch } from 'react-redux';
import MiniLoading from 'components/shared/MiniLoader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: 'auto',
			maxWidth: 230,
			borderRadius: '10px',
			backgroundColor: theme.palette.background.paper,
		},
		hoverIcon: {
			transition: 'all .3s',
			'&:hover': {
				background: '#67B'
			}
		}
	})
);

const ProductFilters = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [clearFilter, setClearFilter] = useState(false)

	const handleClearFilterChange = () => {
		setClearFilter(true);
		dispatch(clearProductsFilter())
		setTimeout(() => setClearFilter(false), 500)
	};

	return (
		<>
		<List className={classes.root}>
			<Box fontSize=".8rem" fontWeight={600} mx={3} my={1}>
				Filter products
			</Box>
			<Box ml={3}>
				<Button variant="outlined" size="small" style={{ fontSize: '.8rem' }}
					onClick={handleClearFilterChange}
				>
					clear filters
			</Button>
			</Box>
			<ListItem>
				<ListItemAvatar>
					<Avatar className={classes.hoverIcon}>
						<AccountTreeIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<CatagoryFilter />
				</Box>
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar className={classes.hoverIcon}>
						<LocalOfferIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<PriceTagFilter />
				</Box>
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar className={classes.hoverIcon}>
						<DonutLargeIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<QtyFilter />
				</Box>
			</ListItem>
		</List>
		{clearFilter && <MiniLoading title="clearing filters..." />}
		</>
	);
};

export default ProductFilters;
