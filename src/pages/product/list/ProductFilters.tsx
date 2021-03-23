import React from 'react';
import {Box} from '@material-ui/core';
import PriceTagFilter from './filters/PriceTagFilter';
import QtyFilter from './filters/QtyFilter';
import CatagoryFilter from './filters/CatagoryFilter';

const ProductFilters = () => {
	return (
		<Box>
			<Box my={1}>
				<CatagoryFilter />
			</Box>
			<Box my={1}>
				<PriceTagFilter />
			</Box>
			<Box my={1}>
				<QtyFilter />
			</Box>
		</Box>
	);
};

export default ProductFilters;