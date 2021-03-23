import React from 'react';
import {Box} from '@material-ui/core';
import PriceTagFilter from './filters/PriceTagFilter';
import QtyFilter from './filters/QtyFilter';

const ProductFilters = () => {
	return (
		<Box>
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
