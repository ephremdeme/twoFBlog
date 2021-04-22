import React from 'react'
import { Grid, Box } from '@material-ui/core';
import PostItem from './PostItem';
import firebase from '../../firebase/firebase';
import { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function PostListItem() {
	const [blogs, setBlogs] = useState<any[]>([]);

	const ref = firebase.firestore().collection("f2-blogs");

	function getBlogs() {
		ref.onSnapshot((querySnapshot) => {
			const items: any[] = [];

			querySnapshot.forEach((doc) => {
				items.push(doc)
				// console.log(items)
			});
			setBlogs(items);
		});
	}

	useEffect(() => {
		getBlogs();
	}, []);

	return (
		<Grid container justify="center" spacing={5}>
			{ blogs.length ? blogs.map((blog) => (
				<Grid item lg={4} md={3} xs={10} justify="center" key={blog.id}>
					<PostItem blog={blog} />
				</Grid>
			)) : (
				<Grid container spacing={3}>
					{
						Array(5).fill(0).map((a, i) => (
							<Grid item lg={4} md={3} xs={10} justify="center" key={i}>
								<Skeleton variant="rect" width={350} height={222} />
								<Skeleton width={350} height={50} />
							</Grid>
						))
					}
				</Grid>
			)}
		</Grid>
	)
}

export default PostListItem