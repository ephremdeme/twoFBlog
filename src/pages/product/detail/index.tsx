import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
	Box,
	ButtonGroup,
	Chip,
	Container,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useFireDoc } from '../../../hooks/useFirestore';
import OverlayLoading from '../../../components/shared/OverlayLoading';
import { IProduct } from 'features/product/types';
import {
	removeProductChart,
	resetProductChart,
	setChart,
} from '../../../features/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { PDB } from 'features/product/init';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import AdditionalDetail from './AdditionalDetail';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LikeViewComponent from './LikeViewComponent';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import data from './data';


const useStyles = makeStyles({
	root: {
		maxWidth: 600,
		margin: 'auto',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
	},
	end: {
		flex: 1,
		alignSelf: 'end',
		justifySelf: 'flex-end',
	},
	productDetail: {
		marginTop: '2rem',
	},
	productDetailImage: {
		overflowX: 'hidden',
		borderRadius: '6px',
	},
});

const ProductDetial = () => {
	const classes = useStyles();
	const { id } = useParams();
	const dispatch = useDispatch();
	const [like, setLike] = useState(0);
	const [liked, setLiked] = useState(false);
	const [view, setView] = useState(1);
	const [showAdditionalDetail, setShowAdditionalDetail] = useState(false);
	const { data: product, loading } = useFireDoc<IProduct>(PDB.PRODCUTS, id);
	const chartProducts = useSelector((state: RootState) => state.product.chart);

	useEffect(() => {
		if (product) setLike(product.likes.length);

		setTimeout(() => {
			setView(view + 1);
		}, 600);
	}, []);

	const handleLike = () => {
		if (liked) {
			if (product) setLike(like - 1);
			setLiked(false);
		} else {
			if (product) setLike(like + 1);
			setLiked(true);
		}
	};

	const addToChart = () => {
		if (product) {
			dispatch(setChart(product));
		}
	};

	const removeChart = () => {
		dispatch(removeProductChart(id));
	};

	const resetChart = () => {
		dispatch(resetProductChart(id));
	};

	return (
		<div>
			{/* <Button
				onClick={() => {
					data.forEach((d) => {
						getCollection('products').add(d);
					});
				}}>
				Add data to FB to fake the users
			</Button> */}
			{loading ? (
				<OverlayLoading />
			) : (
				<Container>
					<Grid
						container
						spacing={3}
						className={classes.productDetail}
						justify="space-evenly">
						<Grid
							item
							lg={4}
							md={5}
							xs={12}
							className={classes.productDetailImage}>
							<img
								style={{
									maxHeight: '450px',
									maxWidth: '500px',
									borderRadius: '10px',
								}}
								src={product?.thumbnail}
								alt="product thumbnail"
							/>
						</Grid>
						<Grid item lg={6} md={7} xs={12}>
							<Box>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center">
									<Box fontWeight={700} fontSize="2.2rem" my={1}>
										{product?.name}
									</Box>
									{!chartProducts[id] ||
										chartProducts[id].products.length <= 0 ? (
										<Button
											size="small"
											variant="outlined"
											startIcon={<AddShoppingCartIcon />}
											onClick={addToChart}>
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
													{chartProducts[id] && chartProducts[id].total}
												</Button>
												<Button startIcon={<DataUsageIcon />}>
													{chartProducts[id] &&
														chartProducts[id].products.length}
												</Button>
												<Button
													startIcon={<AddIcon />}
													onClick={addToChart}></Button>
												<Button
													startIcon={<RemoveIcon />}
													onClick={removeChart}></Button>
												<Button
													startIcon={<DeleteSweepIcon />}
													onClick={resetChart}>
													reset
												</Button>
											</ButtonGroup>
										</Box>
									)}
								</Box>

								<Box display="flex" flexWrap="wrap">
									<Box mr={1}>
										<Chip
											variant="outlined"
											size="small"
											label={product?.catagory}
											deleteIcon={<CheckCircleOutlineIcon />}
										/>
									</Box>
									{product?.brand && (
										<Box mr={1}>
											<Chip
												variant="outlined"
												size="small"
												label={product?.brand}
												deleteIcon={<CheckCircleOutlineIcon />}
											/>
										</Box>
									)}
									{product?.condition && (
										<Box mr={1}>
											<Chip
												variant="outlined"
												size="small"
												label={product?.condition}
												deleteIcon={<CheckCircleOutlineIcon />}
											/>
										</Box>
									)}
								</Box>
								<Box>
									<Box fontWeight={500} fontSize="1rem" my={1}>
										Price {product?.currency} {product?.price}
									</Box>
									<Box>{product?.condition}</Box>
									<Box display="flex" my={1} borderColor="transparent">
										<Typography component="legend">Rating: </Typography>
										<Rating name="read-only" value={4} readOnly />
									</Box>
								</Box>
								<Box fontWeight={300} fontSize="1rem" my={1}>
									{product?.description}
								</Box>
								<LikeViewComponent id={id} />
								{!showAdditionalDetail && (
									<Button
										size="small"
										onClick={() =>
											setShowAdditionalDetail(!showAdditionalDetail)
										}>
										{' '}
										<KeyboardArrowDownIcon />
									</Button>
								)}
								{showAdditionalDetail && product && (
									<AdditionalDetail product={product} />
								)}
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}
		</div>
	);
};

export default ProductDetial;
