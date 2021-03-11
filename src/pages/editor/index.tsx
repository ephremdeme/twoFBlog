import {Container, Grid} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {fetchBlogs, IBlog, selectBlogs, setBlogs} from 'features/editor';
import {useFireCollection} from 'hooks/useFirestore';
import React, {useEffect} from 'react';
import {BlogCard} from './BlogCrad';

function BlogsIndex() {
	const dispatch = useAppDispatch();

	const blogs = useAppSelector(selectBlogs);
	const {loading, data} = useFireCollection<IBlog>('blogs', setBlogs);
	console.log('Wow', loading, data);

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
