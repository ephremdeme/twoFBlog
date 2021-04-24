import React from 'react'
import {
	AppBar,
	Button,
	makeStyles,
	Toolbar,
	Typography
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase, { storage } from '../../firebase';

const useStyle = makeStyles((theme: any) => (
	{
		appBar: {
			background: 'none',
			position: 'sticky'
		},
		button: {
			// flexGrow:1
		},
		appBarPost: {
			flexGrow: 1
		},
		appBarWrapper: {
			width: '85%',
			margin: '0 auto'
		},
		linkStyle: {
			textDecoration: 'none'
		}
	}
));

interface IEditContentProps {
	id: any,
	editor: any,
	title: string,
	image: File | undefined,
	previousCover: string,
	previousTitle: string
}

const EditHeader = (props: IEditContentProps) => {

	const { editor, id, image, title, previousCover, previousTitle } = props

	const [updating, setUpdating] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [notify, setNotify] = useState<boolean>(false);
	const classes = useStyle();
	const history = useHistory();

	const handleCoverImage = () => {
		if (image) {
			return new Promise((resolve, reject) => {
				storage.ref(`covers/${image.name}`).put(image).on(
					"state_changed",
					snapShot => { },
					error => {
						reject(error);
					},
					() => {
						return storage
							.ref('covers')
							.child(image.name)
							.getDownloadURL()
							.then((url: string) => {
								resolve(url)
							});
					}
				);
			});
		}
	}

	const handleUpdateClick = () => {
		setUpdating(true);

		const blogRef = firebase.firestore().collection('f2-blogs');
		if (image == undefined) {
			editor.save()
				.then((output: any) => {
					if (output.blocks.length) {
						if (title) {
							output.title = title
						} else {
							output.title = previousTitle
						}
						output.coverUrl = previousCover
						blogRef.doc(id)
							.update(output)
							.then(() => { setUpdating(false); setNotify(true) })
							.catch(err => console.log(err))
					}
				}).catch((error: any) => {
					console.log(error)
				});
		} else {
			handleCoverImage()?.then((url) => {
				editor.save()
					.then((output: any) => {
						if (output.blocks.length) {

							if (title) {
								output.title = title
							} else {
								output.title = previousTitle
							}

							output.coverUrl = url
							blogRef.doc(id)
								.update(output)
								.then(() => { setUpdating(false); setNotify(true) })
								.catch(err => console.log(err))
						}
					}).catch((error: any) => {
						console.log(error)
					});
			})
				.catch(err => console.log(err));
		}
	}

	const handleDeleteClick = () => {
		setDeleteModal(true)
		setDeleting(true)
	}

	const deleteBlog = () => {
		firebase
			.firestore()
			.collection('f2-blogs')
			.doc(id)
			.delete()
			.then(() => {
				setDeleting(false)
				history.goBack();
			})
			.catch(err => console.log(err));
		setDeleteModal(false)
	}

	return (
		<>
			<AppBar
				className={classes.appBar}
				elevation={0}
			>
				<Toolbar className={classes.appBarWrapper}>
					<Button
						onClick={() => history.goBack()}
						className={classes.button}
					>
						<ChevronLeftIcon />
					</Button>
					<Typography className={classes.appBarPost}></Typography>
					<Button
						className={classes.button}
						onClick={handleUpdateClick}
						disabled={updating}
					>
						{updating ? "Updating ..." : "Update"}
					</Button>
					<Button
						className={classes.button}
						onClick={handleDeleteClick}
						disabled={deleting}
						color="secondary"
					>
						{deleting ? "Deleting ..." : "Delete"}
					</Button>
				</Toolbar>
			</AppBar>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={notify}
				autoHideDuration={6000}
				onClose={() => setNotify(false)}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					severity="success"
					onClose={() => setNotify(false)}
				>
					Updated Successfully!
            </MuiAlert>
			</Snackbar>

			<Dialog
				open={deleteModal}
				onClose={() => { setDeleteModal(false); setDeleting(false) }}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Are you sure that you want to delete permanently?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Once you delete, you can't get it back.
          </DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={deleteBlog} color="secondary">
						Yes
          </Button>
					<Button onClick={() => { setDeleteModal(false); setDeleting(false) }} color="primary" autoFocus>
						No
          </Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default EditHeader