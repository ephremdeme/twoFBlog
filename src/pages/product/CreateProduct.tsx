import React, {useState} from 'react';
import {Box, Button, Container, IconButton, TextField} from '@material-ui/core';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
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
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		margin: {
			margin: theme.spacing(1),
		},
	})
);

const CreateProduct = () => {
	const classes = useStyles();
	const {handleSubmit, control, errors: fieldsErrors, reset} = useForm();
	const [file, setFile] = useState<any>(null);
	const dispatch = useDispatch();
	// const loading = useSelector(selectLoading);
	const history = useHistory();

	const onSubmit = (data: any) => {
		const descriptions = descriptionList.map(
			(desc: any) => desc.description_field + '<:>' + desc.description
		);
		const dataUp = {
			...data,
			addistionalDescription: descriptions,
		};

		// dispatch(
		// 	postProduct({
		// 		file: file,
		// 		data: dataUp,
		// 	})
		// );

		setTimeout(() => history.push('/product'), 1500);
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

	return (
		<Page title="Create Product">
			<Box ml={6} mr={6}>
				<div>
					{/* {loading ? <h1>UpLoading...</h1> : ''} */}
					<Box display="flex" justifyContent="center" width="100%">
						<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={4} justify="center" alignItems="center">
								<Grid item sm={12} md={6}>
									<div className={classes.margin}>
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
																fieldsErrors.name
																	? fieldsErrors.name.message
																	: null
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
									</div>
								</Grid>
								<Grid item sm={12} md={6}>
									<div className={classes.margin}>
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
									</div>
								</Grid>
								<Grid item sm={12} md={6}>
									<div className={classes.margin}>
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
									</div>
								</Grid>
								<Grid item sm={12} md={6}>
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
								<Grid item sm={12} md={6}>
									<div className={classes.margin}>
										<Grid container spacing={1} alignItems="flex-end">
											<Grid item>
												<PhotoLibraryIcon />
											</Grid>
											<Grid item>
												<Button
													variant="outlined"
													size="small"
													component="label">
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
								<Grid item sm={12} md={6}>
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
							</Grid>

							<h5 style={{marginTop: '2rem'}}>
								Optionally you can add additional desciption with field name and
								it's value.
							</h5>
							{descriptionList.map((desc, i) => {
								return (
									<Grid
										container
										spacing={2}
										justify="center"
										alignItems="flex-end">
										<Grid item sm={12} md={5}>
											<TextField
												id="input-with-icon-grid"
												name="description_field"
												label="Field Name"
												value={desc.description_field}
												onChange={(e) => handleInputChange(e, i)}
											/>
										</Grid>
										<Grid item sm={12} md={5}>
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
										<Grid item sm={12} md={2}>
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
							})}
							{generalError && <div>{generalError}</div>}
							<Box mt={3} display="flex" justifyContent="center">
								<Button variant="outlined" size="small" type="submit">
									Add Product
								</Button>
							</Box>
						</form>
					</Box>
				</div>
			</Box>
		</Page>
	);
};

export default CreateProduct;
