// import {fetchBlog, IBlog, selectBlog} from 'features/editor';
import React from 'react';
import {useParams} from 'react-router-dom';
import EditorPage from './editor';
import {IBlog} from '../../features/editor';
import {useFireDoc} from 'hooks/useFirestore';

function ShowBlog() {
	const {blogId} = useParams<{blogId: string}>();
	const {data, loading} = useFireDoc<IBlog>('blogs', blogId);
	console.log('Blog', data);

	if (loading) return <h1>Loading</h1>;
	return <EditorPage edit={true} blog={data} />;
}

export default ShowBlog;
