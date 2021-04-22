import {
	Avatar,
	Box,
	Button,
	Container,
	createStyles,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Theme,
	ListItemText,
	ButtonGroup,
	Chip,
	Divider,
} from '@material-ui/core';
import { RootState } from 'app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartTotal } from '../../../features/product';
import {
	resetChart,
	removeProductChart,
	resetProductChart,
	removeProductsAll,
	setChart,
} from '../../../features/product';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemCard: {
			background: theme.palette.background.default,
			border: '1px solid #1110',
		},
	})
);

const Chart = () => {
	const classes = useStyles();
	const chart = useSelector((state: RootState) => state.product.chart);
	const total = useSelector(selectChartTotal);
	const dispatch = useDispatch();

	const addToChart = (product: any) => {
		if (product) {
			dispatch(setChart(product));
		}
	};

	const removeChart = (id: string) => {
		dispatch(removeProductChart(id));
	};

	const resetProdcutChart = (id: string) => {
		dispatch(resetProductChart(id));
	};

	const renderProdcutList = () => {
		const charts = Object.values(chart);

		return charts.map((chart: any, i: number) => {
			if (chart.products.length !== 0) {
				return (
					<List key={i}>
						<ListItem>
							<ListItemAvatar>
								<Avatar src={chart.products[0].thumbnail} />
							</ListItemAvatar>
							<ListItemText
								primary={chart.products[0].name}
								secondary={chart.products.length}
							/>
							<Box display="flex">
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center">
									{!chart.products || chart.products.length <= 0 ? (
										<Button
											size="small"
											variant="outlined"
											startIcon={<AddShoppingCartIcon />}
											onClick={() => addToChart(chart.products[0])}>
											Add to chart
										</Button>
									) : (
										<Box>
											<ButtonGroup
												size="small"
												aria-label="small outlined button group">
												<Button
													startIcon={<LocalOfferIcon />}
													component={Link}
													to="/products/chart">
													{chart && chart.total}
												</Button>
												<Button startIcon={<DataUsageIcon />}>
													{chart && chart.products.length}
												</Button>
												<Button
													startIcon={<AddIcon />}
													onClick={() =>
														addToChart(chart.products[0])
													}></Button>
												<Button
													startIcon={<RemoveIcon />}
													onClick={() =>
														removeChart(chart.products[0].id)
													}></Button>
												<Button
													startIcon={<DeleteSweepIcon />}
													onClick={() =>
														resetProdcutChart(chart.products[0].id)
													}></Button>
											</ButtonGroup>
										</Box>
									)}
								</Box>
							</Box>
						</ListItem>
					</List>
				);
			} else {
				<Box
					key={i}
					minHeight="60vh"
					minWidth="100%"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					textAlign="center"
					mt={6}>
					<Box fontSize="2.6rem" fontWeight={600}>
						No Product Selected in chart
					</Box>
					<Box fontSize="1rem" fontWeight={400}>
						select a chart to buy...
					</Box>
				</Box>;
			}
		});
	};

	return (
		<Container>
			{Object.keys(chart).length ? (
				<>
					<Box display="flex" justifyContent="space-between" m={3}>
						<Box fontWeight={600} fontSize="1.2rem">
							Products Chart
						</Box>
						<Box>
							<Button size="small" variant="outlined">
								Fulfil Order
							</Button>
						</Box>
					</Box>
					<Box>{renderProdcutList()}</Box>
					<Divider />
					<Box my={2} mx={3} display="flex" alignItems="center">
						<Box fontWeight={600} fontSize="1.2rem" mr={2}>
							Total Price
						</Box>
						<Box fontWeight={600} fontSize="1.2rem">
							{total === 0 ? (
								<Chip component={Link} to="/products/list" label="Select a product" variant="outlined" />
							) : (
								<Chip label={total} variant="outlined" />
							)}
						</Box>
					</Box>
				</>
			) : (
				<Box
					minHeight="60vh"
					minWidth="100%"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					textAlign="center"
					mt={6}>
					<Box fontSize="2.6rem" fontWeight={600}>
						No Product Selected in chart
					</Box>
					<Box fontSize="1rem" fontWeight={400}>
						select a chart to buy...
					</Box>
				</Box>
			)}
		</Container>
	);
};

export default Chart;
