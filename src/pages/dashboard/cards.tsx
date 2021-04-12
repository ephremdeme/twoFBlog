import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import {
	Paper,
	Grid,
	Container,
	styled,
	Button,
	Box,
	Typography,
	makeStyles,
} from '@material-ui/core';
import firebase from '../../firebase/firebase';
import { ReactComponent as Dashboard_Icon_Web_Visit } from 'public/icons/dashboard/icons8_web_visit.svg';
import { ReactComponent as Dashboard_Icon_Web_Blog } from 'public/icons/dashboard/icons8_blog.svg';
import { ReactComponent as Dashboard_Icon_Web_Shooping } from 'public/icons/dashboard/icons8_shopping_cart.svg';
import { ReactComponent as Dashboard_Icon_Web_Users } from 'public/icons/dashboard/icons8_users.svg';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import PiechartDashboard from './PiechartDashboard';
import { selectProducts, setProducts } from 'features/product';
import { getVisit } from 'features/user';
import { getDatabase, useAppSelector, useFirestore } from 'app/hooks';
import { PDB } from 'features/product/init';
import { useFireCollectionRef, useFireCollection } from 'hooks/useFirestore';
import { IProduct } from 'features/product/types';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'black',
	},
	subTitle: {
		color: 'black',
	},
}));

export const Cards = (): JSX.Element => {
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	React.useEffect(() => {
		return () => { };
	}, []);

	const MyPaper = styled(Paper)({
		position: 'relative',
		width: '100%',
		height: '8rem',
		backgroundColor: appTheme ? '#212121' : '#ededed',
		'&:hover': {
			backgroundColor: appTheme ? '#191919' : '#efefef',
		},
		display: 'flex',
		justifyContent: 'flex-end',
	});

	const MyPaper2 = styled(Paper)({
		width: '100%',
		height: '20rem',
		backgroundColor: appTheme ? '#212121' : '#ededed',
		'&:hover': {
			backgroundColor: appTheme ? '#191919' : '#efefef',
		},
		padding: '20px',
	});

	const HoverPaper = styled(Paper)({
		position: 'absolute',
		width: '45%',
		height: '70%',
		bottom: '60px',
		left: '15px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0 1px 15px rgba(0,0,0,0.3)',
		borderRadius: '10px',
		backgroundColor: appTheme ? 'white' : 'white',
		cursor: 'pointer',
		transition: 'all 0.4s',
		'&:hover': {
			transform: 'translateY(-20%)',
			backgroundColor: appTheme ? 'white' : 'white',
		},
		// boxShadow: '2px 2px 10px',
		border: 'none',
	});

	const data = [
		{
			name: 'Mon',
			uv: 5,
			pv: 0,
			amt: 0,
		},
		{
			name: 'Tus',
			uv: 10,
			pv: 0,
			amt: 0,
		},
		{
			name: 'Wen',
			uv: 0,
			pv: 0,
			amt: 0,
		},
		{
			name: 'Thu',
			uv: 0,
			pv: 0,
			amt: 0,
		},
		{
			name: 'Fri',
			uv: 0,
			pv: 0,
			amt: 0,
		},
		{
			name: 'Sat',
			uv: 0,
			pv: 30,
			amt: 0,
		},
		{
			name: 'Sun',
			uv: 0,
			pv: 0,
			amt: 0,
		},
	];

	const page = useSelector((state: RootState) => state.user.pageVisit)
	const dispatch = useDispatch();
	const blogs = useAppSelector(selectProducts);
	const blogCollRef = useFirestore().collection(PDB.PRODCUTS);
	const {data: RefData} = useFireCollectionRef<IProduct>(
    blogCollRef,
		setProducts
  );
  interface IVisit {
	  visit: number;
	  id?: string;
  }
  const {loading: loaingUsers, data: users} = useFireCollection('users');
  const {loading: loaingBlogs, data: blog} = useFireCollection('blogs');
  useEffect(() => {
	  dispatch(getVisit());
  }, [])
	return (
		<Container>
			<Box height={20} />
			<Grid container spacing={4} justify="center">
				<Grid item lg={3} xs={10}>
					<MyPaper elevation={0}>
						<HoverPaper style={{ backgroundColor: '#88B' }} elevation={10}>
							<Dashboard_Icon_Web_Users />
						</HoverPaper>
						<Box width="45%" py={2}>
							<Box fontWeight={600} fontSize="1rem">
								Total Users
							</Box>
							<Box fontWeight={700} fontSize="2.3rem">
								{users && users.length}
							</Box>
						</Box>
					</MyPaper>
				</Grid>
				<Grid item lg={3} xs={10}>
					<MyPaper elevation={0}>
						<HoverPaper style={{ backgroundColor: '#7B6' }} elevation={10}>
							<Dashboard_Icon_Web_Shooping />
						</HoverPaper>

						<Box width="45%" py={2}>
							<Box fontWeight={600} fontSize="1rem">
								Total Products
							</Box>
							<Box fontWeight={700} fontSize="2.3rem">
								{blogs && blogs.length}
							</Box>
						</Box>
					</MyPaper>
				</Grid>
				<Grid item lg={3} xs={10}>
					<MyPaper elevation={0}>
						<HoverPaper style={{ backgroundColor: '#5AAF5E' }} elevation={10}>
							<Dashboard_Icon_Web_Blog />
						</HoverPaper>

						<Box width="45%" py={2}>
							<Box fontWeight={600} fontSize="1rem">
								Total Blogs
							</Box>
							<Box fontWeight={700} fontSize="2.3rem">
								{blog && blog.length}
							</Box>
						</Box>
					</MyPaper>
				</Grid>
				<Grid item lg={3} xs={10}>
					<MyPaper elevation={0}>
						<HoverPaper style={{ backgroundColor: '#2CBECF' }} elevation={10}>
							<Dashboard_Icon_Web_Visit />
						</HoverPaper>

						<Box width="45%" py={2}>
							<Box fontWeight={600} fontSize="1rem">
								Page Visits
							</Box>
							<Box fontWeight={700} fontSize="2.3rem">
								{page && page}
							</Box>
						</Box>
					</MyPaper>
				</Grid>
			</Grid>
			<Box height={50} />
			<Grid container spacing={5}>
				<Grid item lg={8} xs={9}>
					<MyPaper2>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								width={500}
								height={300}
								data={data}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="pv" stroke="#8884d8" />
								<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</MyPaper2>
				</Grid>
				<Grid item lg={4} xs={9}>
					<MyPaper2>
						<PiechartDashboard />
					</MyPaper2>
				</Grid>
			</Grid>
		</Container>
	);
};
