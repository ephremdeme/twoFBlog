// import {fetchBlog, IBlog, selectBlog} from 'features/editor';
import React from 'react';
import {useParams} from 'react-router-dom';
import EditorPage from './editor';
import {IBlog, selectBlog, setBlog} from '../../features/editor';
import {useFireDoc} from 'hooks/useFirestore';
import {useSelector} from 'react-redux';

function ShowBlog() {
	const {blogId} = useParams<{blogId: string}>();
	const {data, loading} = useFireDoc<IBlog>('blogs', blogId, setBlog);
	const blog = useSelector(selectBlog);
	console.log('Blog', blog);

	if (loading) return <h1>Loading</h1>;
	return <EditorPage edit={true} blog={data} />;
}

export default ShowBlog;
