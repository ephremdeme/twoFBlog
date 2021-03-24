import React, {useState} from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
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
import {Box, Checkbox, FormControlLabel} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: 'auto',
			maxWidth: 240,
			borderRadius: '10px',
			backgroundColor: theme.palette.background.paper,
		},
	})
);

const ProductFilters = () => {
	const classes = useStyles();
	const [filtered, setFiltered] = useState<boolean>(false);

	const handleClearFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFiltered(e.target.checked);
	};

	return (
		<List className={classes.root}>
			<Box fontSize=".8rem" fontWeight={600} mx={3} my={1}>
				Filter products
			</Box>
			<FormControlLabel
				control={
					<Checkbox
						checked={filtered}
						onChange={handleClearFilterChange}
						color="primary"
					/>
				}
				style={{fontSize: '.76rem', fontWeight: 500}}
				label="clear filters"
				labelPlacement="start"
			/>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<AccountTreeIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<CatagoryFilter />
				</Box>
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<LocalOfferIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<PriceTagFilter />
				</Box>
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<DonutLargeIcon />
					</Avatar>
				</ListItemAvatar>
				<Box my={1}>
					<QtyFilter />
				</Box>
			</ListItem>
		</List>
	);
};

export default ProductFilters;
