import {Container, Grid} from '@material-ui/core';
import {useAppSelector, useFirestore} from 'app/hooks';
import {IBlog, selectBlogs, setBlogs} from 'features/editor';
import {
	useFireCollection,
	useFireCollectionRef,
	useFireMutation,
} from 'hooks/useFirestore';
import React from 'react';
import {BlogCard} from './BlogCrad';

function BlogsIndex() {
	const blogs = useAppSelector(selectBlogs);
	const blogCollRef = useFirestore().collection('blogs');
	const {data: RefData} = useFireCollectionRef<IBlog>(blogCollRef, setBlogs);
	// useFireMutation('tests', {test: 'test 1'});
	return (
		<>
			<Container>
				<Grid container spacing={5}>
					{blogs.map((blog: IBlog) => (
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
