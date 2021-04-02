import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

interface IProps {
	loading?: boolean;
  items?: number;
}

const ProductCardLoading = ({loading, items}: IProps) => {
	return (
		<Grid container>
			{
				new Array(items || 3).fill(0).map((_: number, i: number) => (
					<Box key={i} width={210} marginRight={0.87} my={2}>
						<Skeleton variant="rect" width={210} height={118} />
						<Box pt={0.5}>
							<Skeleton />
							<Skeleton width="60%" />
						</Box>
					</Box>
				))}
		</Grid>
	);
};

export default ProductCardLoading;
