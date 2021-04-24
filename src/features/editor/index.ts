import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from './../../app/store';

import FB from '../../firebase';
import {useEffect, useState} from 'react';
import {useCollection} from 'app/hooks';
import {useDispatch, useSelector} from 'react-redux';

export interface IBlog {
	id: string;
	title: string;
	blogHash: string;
	date: string;
	coverImageUrl: string;
	authorId: string;
	published: boolean;
	author?: IAuthor;
}

export interface IAuthor {
	uid: string;
	photo: string;
	user_name: string;
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
		date: new Date().toDateString(),
		coverImageUrl: '',
		authorId: '',
		published: false,
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
		updateBlogs: (
			state: IEditorState,
			action: PayloadAction<{id: string; published: boolean}>
		) => {
			// console.log('dispatched hook: ', action.payload);
			state.blogs = state.blogs.map((blog) => {
				if (blog.id === action.payload.id)
					return {
						...blog,
						published: action.payload.published,
					};
				return blog;
			});
		},
		deleteBlog: (state: IEditorState, action: PayloadAction<string>) => {
			state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
		},
		setBlog: (state: IEditorState, action: PayloadAction<IBlog>) => {
			state.blog = action.payload;
		},
		setEditBlog: (
			state: IEditorState,
			action: PayloadAction<{key: string; value: string | boolean}>
		) => {
			let {key, value} = action.payload;
			state.blog = {
				...state.blog,
				[key]: value,
			};
		},
	},
});

// actions exported distructure here
export const {
	setLoadingBlog,
	deleteBlog,
	setBlogs,
	setBlog,
	setEditBlog,
	updateBlogs,
} = editorSlice.actions;

export const fetchBlogs = (): AppThunk => async (dispatch) => {
	dispatch(setLoadingBlog(true));
	FB.firestore()
		.collection('blogs')
		.get()
		.then((querySnapshot) => {
			let blogs: IBlog[] = [];
			let authors: any[] = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// let author =  doc.data().authorId.get().then();
				// console.log(author);
				let data = doc.data();

				blogs.push({
					id: doc.id,
					...doc.data(),
					authorId: data.authorId?.id,
				} as IBlog);
				let refData = data.authorId.get();

				authors.push(refData);
			});
			Promise.all(authors).then((values: any) => {
				interface IAuther {
					[index: string]: {};
				}

				let authorArr: IAuther = {};
				values.map((value: any) => {
					authorArr[value.id] = {
						uid: value.id,
						user_name: value.data().user_name,
						photo: value.data().photo,
					};
					return authorArr;
				});

				blogs = blogs.map((blog, index) => ({
					...blog,
					author: authorArr[blog.authorId] as IAuthor,
				}));

				dispatch(setBlogs(blogs));
				dispatch(setLoadingBlog(false));
			});
		});
};

export const fetchBlog = (blogId: string): AppThunk => async (dispatch) => {
	const firestore = FB.firestore();

	let blog: any = await firestore.collection('blogs').doc(blogId).get();
	let data = blog.data();
	let refData = await data.authorId.get();

	dispatch(setLoadingBlog(true));

	let blogData = {
		id: blog.id,
		...blog.data(),
		authorId: data.authorId.id,
		author: {
			uid: refData.id,
			user_name: refData.data().user_name,
			photo: refData.data().photo,
		},
	} as IBlog;

	// console.log('FFFFF', blogData);
	dispatch(setBlog(blogData));

	dispatch(setLoadingBlog(false));
};

export const useFetchBlog = (blogId: string) => {
	const [blog, setBlog] = useState<IBlog>(initialState.blog);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const firestore = FB.firestore();
		FB.firestore();
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
	const firestore = FB.firestore();
	let {id, authorId, author, ...withoutId} = blog;
	dispatch(setLoadingBlog(true));
	const authorRef = useCollection('users').doc(authorId);
	let updatedBlog = {
		...withoutId,
		authorId: authorRef,
	};
	let data = await firestore.collection('blogs').add(updatedBlog);
	console.log('Added Blog', data);

	setTimeout(() => {
		dispatch(setLoadingBlog(false));
	}, 2000);
};

export const useAddBlog = () => {
	const [loading, setLoading] = useState<boolean>();

	const usersRef = useCollection('users');
	const handleBlogPost = async (blog: IBlog) => {
		setLoading(true);
		const firestore = FB.firestore();
		let {id, authorId, author, ...withoutId} = blog;
		const authorRef = usersRef.doc(authorId);
		let updatedBlog = {
			...withoutId,
			id: id,
			authorId: authorRef,
		};

		await firestore.collection('blogs').doc(id).set(updatedBlog);

		setLoading(false);
	};

	return {handleBlogPost, loading};
};

export const updateBlogPublish = (
	id: string,
	published: boolean
): AppThunk => async (dispatch) => {
	const firestore = FB.firestore();
	dispatch(setLoadingBlog(true));

	dispatch(
		updateBlogs({
			id: id,
			published: published,
		})
	);

	await firestore.collection('blogs').doc(id).update({
		published: published,
	});

	dispatch(setLoadingBlog(false));
};

export const selectLoading = (state: RootState) => state.editor.loading;

export const selectBlogs = (state: RootState) => state.editor.blogs;
export const selectBlog = (state: RootState) => state.editor.blog;

export const selectPublishedBlogs = (state: RootState) =>
	state.editor.blogs.filter((blog) => blog.published === true);
export const selectUnPublishedBlogs = (state: RootState) =>
	state.editor.blogs.filter((blog) => blog.published === false);
// selector field sample
// export const selectCount = (state: RootState) => state.counter.value;

export default editorSlice.reducer;
