// import {fetchBlog, IBlog, selectBlog} from 'features/editor';
import React from 'react';
import {useParams} from 'react-router-dom';
import EditorPage from './editor';
import {useFetchBlog} from '../../features/editor';

function ShowBlog() {
	const {blogId} = useParams<{blogId: string}>();
	const {loading, blog} = useFetchBlog(blogId);
	console.log('Blog', blog);

	if (loading) return <h1>Loading</h1>;
	return <EditorPage edit={true} blog={blog} />;
}

export default ShowBlog;
