import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from './../../app/store';

import FB from '../../firebase/firebase';
import {useEffect, useState} from 'react';

export interface IBlog {
	id: string;
	title: string;
	blogHash: string;
	date: string;
	coverImageUrl: string;
	authorId: string;
}

interface IEditorState {
	loading: boolean;
	blogs: IBlog[];
	blog: IBlog;
	// TODO: init editor field types
}

const initialState: IEditorState = {
	// TODO: init editor field initial values
	loading: false,
	blogs: [],
	blog: {
		id: '',
		title: '',
		blogHash: '',
		date: '',
		coverImageUrl: '',
		authorId: '',
	},
};

const editorSlice = createSlice({
	name: 'editor_store',
	initialState,
	reducers: {
		setLoadingBlog: (state: IEditorState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setBlogs: (state: IEditorState, action: PayloadAction<IBlog[]>) => {
			// console.log('dispatched hook: ', action.payload);
			state.blogs = action.payload;
		},
		setBlog: (state: IEditorState, action: PayloadAction<IBlog>) => {
			state.blog = action.payload;
		},
	},
});

// actions exported distructure here
export const {setLoadingBlog, setBlogs, setBlog} = editorSlice.actions;

export const fetchBlogs = (): AppThunk => async (dispatch) => {
	dispatch(setLoadingBlog(true));
	FB.getInstance()
		.db.collection('blogs')
		.get()
		.then((querySnapshot) => {
			let blogs: IBlog[] = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// let author =  doc.data().authorId.get().then();
				// console.log(author);

				blogs.push({
					id: doc.id,
					...doc.data(),
					authorId: 'Girma Kasu',
				} as IBlog);
			});
			dispatch(setBlogs(blogs));
		});

	// console.log(docs.data());
};

export const fetchBlog = (blogId: string): AppThunk => async (dispatch) => {
	const firestore = FB.getInstance().db;
	let blog: any = await firestore.collection('blogs').doc(blogId).get();
	console.log('FFFFF', blog);
	setBlog({...blog.data(), authorId: 'Girma Kasu', id: blog.id} as IBlog);
};

export const useFetchBlog = (blogId: string) => {
	const [blog, setBlog] = useState<IBlog>(initialState.blog);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const firestore = FB.getInstance().db;
		const fetchBlog = async () => {
			const data: any = await firestore.collection('blogs').doc(blogId).get();
			setBlog({...data.data(), id: data.id});
			setLoading(false);
		};
		fetchBlog();
	}, [blogId]);

	return {blog, loading};
};

export const postBlog = (blog: IBlog): AppThunk => async (dispatch) => {
	const firestore = FB.getInstance().db;
	let {id, ...withoutId} = blog;
	setLoadingBlog(true);
	firestore.collection('blogs').add(withoutId);
	setLoadingBlog(false);
};

export const updateBlog = (blog: IBlog): AppThunk => async (dispatch) => {
	const firestore = FB.getInstance().db;
	let {id, ...withoutId} = blog;
	setLoadingBlog(true);
	firestore.collection('blogs').doc(id).update(withoutId);
	setLoadingBlog(false);
};

export const selectLoading = (state: RootState) => state.editor.loading;

export const selectBlogs = (state: RootState) => state.editor.blogs;
export const selectBlog = (state: RootState) => state.editor.blog;
// selector field sample
// export const selectCount = (state: RootState) => state.counter.value;

export default editorSlice.reducer;
