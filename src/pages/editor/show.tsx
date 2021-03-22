// import {fetchBlog, IBlog, selectBlog} from 'features/editor';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import EditorPage from './editor';
import {
	fetchBlog,
	IBlog,
	selectBlog,
	selectLoading,
	setBlog,
} from '../../features/editor';
import {useFireDoc} from 'hooks/useFirestore';
import {useSelector, useDispatch} from 'react-redux';

function ShowBlog() {
	const {blogId} = useParams<{blogId: string}>();
	// const {data, loading} = useFireDoc<IBlog>('blogs', blogId, setBlog);
	const blog = useSelector(selectBlog);
	const loading = useSelector(selectLoading);

	const dispatch = useDispatch();
	console.log('Blog', blog, loading);

	useEffect(() => {
		dispatch(fetchBlog(blogId));
	}, []);

	if (loading) return <h1>Loading</h1>;
	return <EditorPage edit={false} blog={blog} />;
}

export default ShowBlog;
