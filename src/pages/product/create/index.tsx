import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
	Box,
	Checkbox,
	createStyles,
	Grid,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useHistory} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useForm, Controller} from 'react-hook-form';
// import ImageUploader from 'react-images-upload';

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
	})
);

export default function Create() {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState('money');

	const {handleSubmit, control, errors: fieldsErrors, reset} = useForm();

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

	// const onDrop = (picture: any) => {
	// 	console.log(picture);
	// };

	// additional description
	const [descriptionList, setDescriptionList] = useState([
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
	// additional description end

	return (
		<Container maxWidth="md" style={{marginTop: '1.3rem'}}>
			<Box fontSize="1.3rem" fontWeight={700}>
				Create a new product
			</Box>

			<form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={5}>
					<Grid item sm={12} md={6}>
						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Product Name"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// name: string;
								/>
							}
						/>

						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Quantity Available"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// qty: string;
								/>
							}
						/>

						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Currency"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// currency: string;
								/>
							}
						/>

						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Price"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// price: string;
								/>
							}
						/>
					</Grid>

					<Grid item sm={12} md={6}>
						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Brand"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// brand: string;
								/>
							}
						/>

						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setTitle(e.target.value)}
									label="Catagory"
									color="primary"
									size="small"
									fullWidth
									required
									error={titleError}
									// catagory: string;
								/>
							}
						/>

						{/* Image upload */}

						<FormControl style={{minWidth: 250}}>
							<InputLabel id="demo-simple-select-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								// onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

						<Controller
							name="stock_qty"
							control={control}
							defaultValue=""
							rules={{
								required: true,
							}}
							as={
								<TextField
									className={classes.field}
									onChange={(e) => setDetails(e.target.value)}
									label="Description"
									color="primary"
									multiline
									rows={4}
									fullWidth
									required
									error={detailsError}
									// description: string;
								/>
							}
						/>
					</Grid>
				</Grid>

				<Box fontSize=".86rem">Additional Description</Box>
				{descriptionList.map((desc, i) => {
					return (
						<Grid container spacing={2} justify="center" alignItems="flex-end">
							<Grid item sm={12} md={5}>
								<TextField
									id="input-with-icon-grid"
									name="description_field"
									label="Field Name"
									value={desc.description_field}
									required
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
									required
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
				<Button
					type="submit"
					color="primary"
					variant="contained"
					style={{
						marginTop: 10,
					}}
					endIcon={<KeyboardArrowRightIcon />}>
					Submit
				</Button>
				<Box mt={10}></Box>
			</form>
		</Container>
	);
}
