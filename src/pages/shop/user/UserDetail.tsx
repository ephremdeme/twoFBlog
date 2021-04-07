import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useFireDoc} from '../../../hooks/useFirestore';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, green} from '@material-ui/core/colors';
import {Box, Chip, Container, Divider, Grid, TextField} from '@material-ui/core';
import {User} from 'features/user/types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoadingOnly from 'components/shared/LoadingOnly';
import EditUserDetail from './EditUserDetail';
import { getCollection } from 'app/hooks';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		square: {
			color: theme.palette.getContrastText(deepOrange[500]),
			backgroundColor: deepOrange[500],
		},
		rounded: {
			width: '200px',
			height: '200px',
			color: '#fff',
			backgroundColor: green[500],
		},
	})
);


const UserDetail = () => {
	const classes = useStyles();
	const {id} = useParams();
	const history = useHistory();
	const {loading, data} = useFireDoc<User>('users', id);
	const [editMode, setEditMode] = useState(false);

	const getUserData = () => {
		return (
			data && (
				<Grid item sm={12} md={5} lg={4}>
					<Box fontWeight={500} fontSize="1.1rem" mb={1}>
						{data.user_name}
					</Box>
					<Box fontWeight={500} fontSize="1rem" mb={1}>
						{data.email}
					</Box>
					<Chip label={data.role} />
					<Box fontWeight={500} fontSize="1rem" mb={1}>
						{data.view}
					</Box>
				</Grid>
			)
		);
	};

  const deleteUser = () => {
    getCollection('users').doc(id).delete()
		history.push("/admin/users")
  }
	
	return (
		<Container maxWidth="md">
			{loading && !data && <LoadingOnly size={50} />}
			{!loading && data && (
				<>
					<Box
						my={2}
						mx={3}
						display="flex"
						justifyContent="space-between"
						alignItems="center">
						<Box fontWeight={600} fontSize="1rem">
							User Profile
						</Box>
						<Box>
							<IconButton aria-label="delete" onClick={deleteUser}>
								<DeleteIcon fontSize="small" />
							</IconButton>
							<IconButton aria-label="delete" onClick={() => setEditMode(true)}>
								<EditIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
					<Divider style={{margin: '1rem 0 2rem'}} />
					<Grid container spacing={1}>
						<Grid item sm={12} md={5} lg={4}>
							<Avatar
								variant="rounded"
								className={classes.rounded}
								src={data.photo}
							/>
						</Grid>
						{!editMode ? getUserData() : <EditUserDetail user={data} id={id} />}
					</Grid>
				</>
			)}
		</Container>
	);
};

export default UserDetail;
