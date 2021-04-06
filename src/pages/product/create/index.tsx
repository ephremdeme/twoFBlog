import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
	Box,
	createStyles,
	Divider,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { postProduct } from '../../../features/product';
import AdditionalDescriptionForm from './AdditionalDescriptionForm';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		field: {
			marginTop: 20,
			marginBottom: 20,
			display: 'block',
		},
		margin: {
			margin: theme.spacing(1),
		},
		formContainer: {
			width: "80%",
			margin: "auto"
		}
	})
);

export default function Create() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const userID = useSelector((state: RootState) => state.auth.uid);
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [file, setFile] = useState<any>(null);
	const [category, setCategory] = useState('money');
	const [condition, setCondition] = React.useState('');

	const handleConditionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setCondition(event.target.value as string);
	};

	const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();

	const onSubmit = async (data: any) => {
		// const descriptions = descriptionList.map(
		// 	(desc: any) => desc.description_field + '<:>' + desc.description
		// );

		console.log('The Data: ', data);
		console.log('file: ', file)

		const dataUp = {
			...data,
			uid: userID,
			// additionalDescription: descriptions,
			condition: condition,
		};

		dispatch(
			postProduct({
				file: file,
				data: dataUp,
			})
		);
		setTimeout(() => history.push('/products/list/admin'), 1500);
	};

	// image file
	const handleChange = (e: any) => {
		let selected = e.target.files[0];
		setFile(selected);
	};

	const onDescriptionChange = (desc: any) => {
		console.log("AAAAAAAAAAAAAAAAAa: ", desc)
	}


	return (
		<Container maxWidth="md" style={{ marginTop: '1.3rem' }} className={classes.formContainer} >
			<Box fontSize="1.3rem" fontWeight={700}>
				Create a new product
			</Box>

			<form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid item sm={12} md={6}>
						<Controller
							name="name"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Product Name"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>

						<Controller
							name="qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Quantity Available"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>

						<Controller
							name="currency"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Currency"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>

						<Controller
							name="price"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Price"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>
						<Box mb={2}>
							<Button variant="outlined" size="small" component="label">
								Upload Product Thumbnail Image
							<input
									name="images"
									type="file"
									multiple
									accept="image/*"
									hidden
									onChange={handleChange}
								/>
							</Button>
						</Box>
					</Grid>

					<Grid item sm={12} md={6}>
						<Controller
							name="brand"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Brand"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>

						<Controller
							name="catagory"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Catagory"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
								/>
							}
						/>

						<FormControl variant="outlined" size="small" style={{ minWidth: 260, maxWidth: "400px" }}>
							<InputLabel id="demo-simple-select-label">Condition</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={condition}
								onChange={handleConditionChange}
							>
								<MenuItem value="new">New</MenuItem>
								<MenuItem value="used">Used</MenuItem>
							</Select>
						</FormControl>

						<Controller
							name="description"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									variant="outlined"
									className={classes.field}
									onChange={(e) => setDetails(e.target.value)}
									label="Description"
									color="primary"
									multiline
									rows={4}
									fullWidth
									required
									error={detailsError}
								/>
							}
						/>
					</Grid>
				</Grid>

				<Divider />
				<Box my={4}></Box>
				<Grid container spacing={2}>
					<Grid item xs={10} lg={6}>
						<FormControl variant="outlined" size="small" style={{ minWidth: 260 }}>
							<InputLabel id="demo-simple-select-outlined-label">Select Branch</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								// value={age}
								// onChange={handleChange}
								label="Select Branch..."
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>22 Branch</MenuItem>
								<MenuItem value={20}>Arada</MenuItem>
								<MenuItem value={30}>Mexico</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={10} lg={6}>
						<FormControl variant="outlined" size="small" style={{ minWidth: 260 }}>
							<InputLabel id="demo-simple-select-outlined-label">Shope</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								// value={age}
								// onChange={handleChange}
								label="Select Branch"
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Box fontSize=".86rem" mt={4}>Additional Description</Box>
				<AdditionalDescriptionForm descriptions={onDescriptionChange} />

				<Button
					disableElevation
					type="submit"
					color="primary"
					variant="contained"
					style={{
						marginTop: "3rem",
						maxWidth: "300px",
						width: '80%'
					}}
					endIcon={<KeyboardArrowRightIcon />}>
					Submit
				</Button>
				<Box mt={10}></Box>
			</form>
		</Container >
	);
}
