import {Container, Grid} from '@material-ui/core';
import {useAppSelector, useCollection, useFirestore} from 'app/hooks';
import {fetchBlogs, IBlog, selectBlogs, setBlogs} from 'features/editor';
import {useFireCollection, useFireCollectionRef} from 'hooks/useFirestore';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BlogCard} from './BlogCrad';

function BlogsIndex() {
	const blogs = useAppSelector(selectBlogs);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchBlogs());
	}, []);
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
