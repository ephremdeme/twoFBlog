import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {
	Box,
	ButtonGroup,
	Chip,
	Container,
	Grid,
	makeStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useFireDoc} from '../../hooks/useFirestore';
import OverlayLoading from '../../components/shared/OverlayLoading';
import {IProduct} from 'features/product/types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
	removeProductChart,
	resetProductChart,
	setChart,
} from '../../features/product';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {PDB} from 'features/product/init';
import {Link} from 'react-router-dom';
import {getCollection} from 'app/hooks';

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
	const {id} = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [like, setLike] = useState(0);
	const [liked, setLiked] = useState(false);
	const [view, setView] = useState(1);
	const chartProducts = useSelector((state: RootState) => state.product.chart);
	const {data: product, loading} = useFireDoc<IProduct>(PDB.PRODCUTS, id);

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
			<Button
				onClick={() => {
					getCollection('products').add({
						thumbnail:
							'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fproduct&psig=AOvVaw1Oz_cycDyx4hu7MjguuOK6&ust=1616312004857000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCY88qtvu8CFQAAAAAdAAAAABAD',
						price: 274,
						views: ['y8y01szUCkSGRG4zyaKjKG7fZEu1'],
						name: 'Boss Earphone',
						createdAt: {
							seconds: 1615892760,
							nanoseconds: 0,
						},
						qty: '435',
						reviews: [
							{
								y8y01szUCkSGRG4zyaKjKG7fZEu1: 4,
							},
						],
						likes: ['y8y01szUCkSGRG4zyaKjKG7fZEu1'],
						additionalDescription: {
							Quality: 'high quality',
							ISO: '1490',
							Speakers: 'Dual Sterio',
							Version: '5.6',
							condition: 'new',
						},
						uid: 'WX6wYlKap5VCveKldOaDHRivmFJ2',
						updatedAt: {
							seconds: 1615893120,
							nanoseconds: 0,
						},
						sid: '9E79ue4tt8j1vX64m7rq',
						commentCount: 1,
						ratingReview: 4,
						currency: 'USD',
						catagory: 'Audio Earphone',
						images: [
							'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/QCEM_PP_Ecom_B_Silo_Hero_Black_1200x1022_web.png/jcr:content/renditions/cq5dam.web.320.320.png',
							'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/images/QCEB_PP_02_Sound_Silo_1x1_web.jpg/jcr:content/renditions/cq5dam.web.320.320.jpeg',
							'https://images-na.ssl-images-amazon.com/images/I/611qu2aEn1L._AC_SL1384_.jpg',
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwQzEeRlVHdbt5qHS6iQsTftsGGfgdGT8E8jZswwekAHAXy1S6wBi0QUDPT46MQFOBwQ&usqp=CAU',
						],
						brand: 'Boss',
						description:
							"Bose QuietComfort Noise Cancelling Earbuds - True Wireless Earphones, Triple Black, the World's Most Effective Noise Cancelling Earbuds",
					});
				}}>
				Add data to FB to fake the users
			</Button>

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
							<img src={product?.thumbnail} alt="product thumbnail" />
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
													startIcon={<ArrowUpwardIcon />}
													onClick={addToChart}></Button>
												<Button
													startIcon={<ArrowDownwardIcon />}
													onClick={removeChart}></Button>
												<Button
													startIcon={<NotInterestedIcon />}
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
								</Box>
								<Box fontWeight={300} fontSize="1rem" my={1}>
									{product?.description}
								</Box>
								<Box>
									<ButtonGroup
										size="small"
										aria-label="small outlined button group">
										<Button startIcon={<VisibilityIcon />}>{view}</Button>
										<Button startIcon={<FavoriteIcon />} onClick={handleLike}>
											{like}
										</Button>
										<Button startIcon={<ChatRoundedIcon />}>34</Button>
									</ButtonGroup>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}
		</div>
	);
};

export default ProductDetial;
