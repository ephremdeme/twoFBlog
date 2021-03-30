// import {fetchBlog, IBlog, selectBlog} from 'features/editor';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import EditorPage from './editor';
import {fetchBlog, selectBlog, selectLoading} from '../../features/editor';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'app/store';

function ShowBlog() {
	const {blogId} = useParams<{blogId: string}>();
	// const {data, loading} = useFireDoc<IBlog>('blogs', blogId, setBlog);
	const blog = useSelector(selectBlog);
	const user = useSelector((state: RootState) => state.auth);
	const loading = useSelector(selectLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBlog(blogId));
	}, [blogId, dispatch]);

	if (loading) return <h1>Loading</h1>;
	return (
		<EditorPage edit={false} blog={blog} deleteAble={user.role === 'EDITOR'} />
	);
}

export default ShowBlog;
