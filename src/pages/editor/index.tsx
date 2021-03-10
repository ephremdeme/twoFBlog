import {Container, Grid} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {fetchBlogs, selectBlogs} from 'features/editor';
import React, {useEffect} from 'react';
import {BlogCard} from './BlogCrad';

function BlogsIndex() {
	const dispatch = useAppDispatch();

	const blogs = useAppSelector(selectBlogs);

	useEffect(() => {
		dispatch(fetchBlogs());
	}, []);
	return (
		<>
			<Container>
				<Grid container spacing={5}>
					{blogs.map((blog) => (
						<Grid item md={4} key={blog.id}>
							<BlogCard blog={blog} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}

export default BlogsIndex;
