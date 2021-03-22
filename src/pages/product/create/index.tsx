import React, {useState} from 'react';
import {
	makeStyles,
	Theme,
	createStyles,
	withStyles,
} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
	Box,
	Button,
	Container,
	FormControlLabel,
	IconButton,
	TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Page from 'components/shared/Page';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useForm, Controller} from 'react-hook-form';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
// import {postProduct, selectLoading} from '../../features/product';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '90%',
			margin: 'auto',
			minHeight: '100vh',
		},
		form: {},
		button: {
			marginTop: theme.spacing(1),
			marginRight: theme.spacing(1),
		},
		actionsContainer: {
			marginBottom: theme.spacing(2),
		},
		resetContainer: {
			padding: theme.spacing(3),
		},
		margin: {
			margin: theme.spacing(1),
		},
	})
);

function getSteps() {
	return [
		'Product Info',
		'Product Details',
		'Product Additional Details',
		'Set Product Setting',
	];
}

const CreateProduct = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleReset = () => {
		setActiveStep(0);
	};

	const {handleSubmit, control, errors: fieldsErrors, reset} = useForm();

	const [file, setFile] = useState<any>(null);
	const dispatch = useDispatch();
	// const loading = useSelector(selectLoading);
	const steps = getSteps();
	const history = useHistory();

	const onSubmit = (data: any) => {
		const descriptions = descriptionList.map(
			(desc: any) => desc.description_field + '<:>' + desc.description
		);

		console.log('The Data: ', data);

		const dataUp = {
			...data,
			addistionalDescription: descriptions,
		};

		console.log(dataUp);

		// dispatch(
		// 	postProduct({
		// 		file: file,
		// 		data: dataUp,
		// 	})
		// );

		// setTimeout(() => history.push('/product'), 1500);
	};

	const [generalError, setGeneralError] = useState('');
	const [descriptionList, setDescriptionList] = useState([
		{description_field: '', description: ''},
		{description_field: '', description: ''},
	]);

	const handleInputChange = (
		e: React.SyntheticEvent<EventTarget>,
		index: number
	) => {
		const value = (e.target as HTMLInputElement).value;
		const name = (e.target as HTMLInputElement).name;
		const list: any = [...descriptionList];

		if (name) {
			list[index][name] = value;
		}
		setDescriptionList(list);
	};

	const handleRemoveClick = (index: number) => {
		const list = [...descriptionList];
		list.splice(index, 1);
		setDescriptionList(list);
	};

	const handleAddClick = () => {
		setDescriptionList([
			...descriptionList,
			{description_field: '', description: ''},
		]);
	};
	// image file
	const handleChange = (e: any) => {
		let selected = e.target.files[0];
		setFile(selected);
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return {
					text: `Add name, catagory and stock`,
					form: (
						<Box>
							<Grid item xs={12} md={10}>
								<Grid container spacing={1} alignItems="flex-end">
									<Grid item>
										<ShortTextIcon />
									</Grid>
									<Grid item>
										<Controller
											name="name"
											as={
												<TextField
													id="prod_name"
													label="Name"
													helperText={
														fieldsErrors.name ? fieldsErrors.name.message : null
													}
													error={fieldsErrors.name}
												/>
											}
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={10}>
								<Grid container spacing={1} alignItems="flex-end">
									<Grid item>
										<ClassIcon />
									</Grid>
									<Grid item>
										<Controller
											name="catagory"
											as={
												<TextField
													id="catagory"
													label="Catagory"
													helperText={
														fieldsErrors.catagory
															? fieldsErrors.catagory.message
															: null
													}
													error={fieldsErrors.catagory}
												/>
											}
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={10}>
								<Grid container spacing={1} alignItems="flex-end">
									<Grid item>
										<ViewComfyIcon />
									</Grid>
									<Grid item>
										<Controller
											name="stock_qty"
											as={
												<TextField
													id="stock_quantity"
													label="Stock product quantity"
													type="number"
													helperText={
														fieldsErrors.stock_qty
															? fieldsErrors.stock_qty.message
															: null
													}
													error={fieldsErrors.stock_qty}
												/>
											}
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					),
				};
			case 1:
				return {
					text: 'Add price image and description for your product',
					form: (
						<Box>
							<Grid item xs={12} md={10}>
								<div className={classes.margin}>
									<Grid container spacing={1} alignItems="flex-end">
										<Grid item>
											<LocalOfferIcon />
										</Grid>
										<Grid item>
											<Controller
												name="price"
												as={
													<TextField
														id="prod_price"
														label="Price"
														helperText={
															fieldsErrors.price
																? fieldsErrors.price.message
																: null
														}
														error={fieldsErrors.price}
													/>
												}
												control={control}
												defaultValue=""
												rules={{
													required: true,
												}}
											/>
										</Grid>
									</Grid>
								</div>
							</Grid>
							<Grid item xs={12} md={10}>
								<div className={classes.margin}>
									<Grid container spacing={1} alignItems="flex-end">
										<Grid item>
											<PhotoLibraryIcon />
										</Grid>
										<Grid item>
											<Button variant="outlined" size="small" component="label">
												Upload Product Image
												<input
													name="images"
													type="file"
													multiple
													accept="image/*"
													hidden
													onChange={handleChange}
												/>
											</Button>
										</Grid>
									</Grid>
								</div>
							</Grid>
							<Grid item xs={12} md={10}>
								<div className={classes.margin}>
									<Grid container spacing={1} alignItems="flex-end">
										<Grid item>
											<SubjectIcon />
										</Grid>
										<Grid item>
											<Controller
												name="product_description"
												as={
													<TextField
														id="prod_price"
														label="Product Description"
														multiline
														rowsMax={20}
														rows={4}
														helperText={
															fieldsErrors.product_description
																? fieldsErrors.product_description.message
																: null
														}
														error={fieldsErrors.product_description}
													/>
												}
												control={control}
												defaultValue=""
												rules={{
													required: true,
												}}
											/>
										</Grid>
									</Grid>
								</div>
							</Grid>
						</Box>
					),
				};
			case 2:
				return {
					text: `Additional description for product use field to describe the additional field and the descriptiion for the field along side.`,
					form: descriptionList.map((desc: any, i: number) => {
						return (
							<Grid
								container
								spacing={2}
								justify="center"
								alignItems="flex-end">
								<Grid item xs={12} md={5}>
									<TextField
										id="input-with-icon-grid"
										name="description_field"
										label="Field Name"
										value={desc.description_field}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</Grid>
								<Grid item xs={12} md={5}>
									<TextField
										id="input-with-icon-grid"
										name="description"
										label="Field Description"
										multiline
										rowsMax={20}
										rows={3}
										value={desc.description}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</Grid>
								<Grid item xs={12} md={2}>
									<Box display="flex" justifyContent="space-between">
										{descriptionList.length !== 1 && (
											<IconButton
												aria-label="delete"
												className={classes.margin}
												onClick={() => handleRemoveClick(i)}>
												<DeleteIcon fontSize="inherit" />
											</IconButton>
										)}
										{descriptionList.length - 1 === i && (
											<IconButton
												aria-label="delete"
												className={classes.margin}
												onClick={handleAddClick}>
												<AddBoxIcon fontSize="inherit" />
											</IconButton>
										)}
									</Box>
								</Grid>
							</Grid>
						);
					}),
				};
			case 3:
				return {
					text: 'Set product setting',
					form: (
						<Box>
							<Controller
								name="likes_setting"
								as={
									<FormControlLabel
										id="likes_setting"
										label="Small"
										control={<Switch />}
									/>
								}
								control={control}
								defaultValue=""
								rules={{
									required: true,
								}}
							/>

							<Controller
								name="comments_setting"
								as={
									<FormControlLabel
										id="comments_setting"
										label="Small"
										control={<Switch />}
									/>
								}
								control={control}
								defaultValue=""
								rules={{
									required: true,
								}}
							/>

							<Button variant="outlined" size="small" type="submit">
								Submit
							</Button>
						</Box>
					),
				};
			default:
				return {
					text: 'Unknown step',
					form: <h1>Some form here</h1>,
				};
		}
	};

	return (
		<div className={classes.root}>
			<h2>Add New Product</h2>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Container>
					<Stepper
						activeStep={activeStep}
						orientation="vertical"
						className={classes.form}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									<Typography>{getStepContent(index).text}</Typography>
									{getStepContent(index).form}
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={classes.button}>
												Back
											</Button>
											<Button
												variant="outlined"
												size="small"
												onClick={handleNext}
												className={classes.button}>
												{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</Container>
				{activeStep === steps.length && (
					<Paper square elevation={0} className={classes.resetContainer}>
						<Typography variant="body2">
							All steps finished you can click add products to add or reset to
							edit.
						</Typography>

						<Box display="flex" alignItems="center">
							<Button
								variant="outlined"
								size="small"
								onClick={handleReset}
								className={classes.button}>
								Reset
							</Button>
							<Button variant="outlined" size="small" type="submit">
								Add Product
							</Button>
						</Box>
					</Paper>
				)}
			</form>
		</div>
	);
};

export default CreateProduct;
