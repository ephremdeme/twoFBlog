import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import { getCollection } from 'app/hooks';
import {User} from 'features/auth/types';
import React, { useEffect } from 'react';
import {Controller, useForm} from 'react-hook-form';
import { useHistory } from 'react-router';

interface IProps {
	user: {
		user_name: string;
		email: string;
		photo: string;
		role: string;
	};
	id: string;
}

const EditUserDetail: React.FC<IProps> = ({user, id}) => {
	const history = useHistory();
	const {handleSubmit, control, errors: fieldsErrors, reset} = useForm({
		defaultValues: {
			user_name: user.user_name,
			email: user.email,
		},
	});
	const [roleUser, setRoleUser] = React.useState('');
	useEffect(() => {
		setRoleUser(user.role)
	}, [])

	const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
		setRoleUser(event.target.value as string);
	};

	const onSubmit = (data: any) => {
		const updatedUser = {
			...data,
			role: roleUser
		}

		getCollection('users').doc(id).update(updatedUser).then(() => {
			history.push('/auth/users')
		})
	}

	return (
		<Grid item sm={12} md={5} lg={5}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box my={2}>
					<Controller
						name="user_name"
						as={<TextField fullWidth id="prod_name" label="Name" />}
						control={control}
						// defaultValue=""
						rules={{
							required: true,
						}}
					/>
				</Box>
				<Box my={2}>
					<Controller
						name="email"
						as={
							<TextField
								fullWidth
								id="prod_name"
								label="Email"
								value={user.email}
							/>
						}
						control={control}
						// defaultValue={user.email}
						rules={{
							required: true,
						}}
					/>
				</Box>
				<Box my={2}>
					<FormControl style={{display: 'block', minWidth: '250px'}}>
						<InputLabel id="demo-simple-select-label">Age</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={roleUser}
							onChange={handleChangeRole}
						>
							<MenuItem value="ADMIN">ADMIN</MenuItem>
							<MenuItem value="EDITOR">EDITOR</MenuItem>
							<MenuItem value="BLOGGER">BLOGGER</MenuItem>
							<MenuItem value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</MenuItem>
							<MenuItem value="USER">USER</MenuItem>
							<MenuItem value="GUEST">GUEST</MenuItem>
							<MenuItem value="SHOPE_ADMIN">SHOPE_ADMIN</MenuItem>
							<MenuItem value="SELLER">SELLER</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box my={2} display="flex" alignItems="center">
					<Button variant="outlined" size="small" type="submit">
						Update User
					</Button>
				</Box>
			</form>
		</Grid>
	);
};

export default EditUserDetail;
