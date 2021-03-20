
export interface IProduct {
	id: string;
	name: string;
	uid: string;
	sid?: string;
	description: string;
	additionalDescription?: string;
	thumbnail: string;
	images: string[];
	qty: string;
	price: string;
	currency: string;
	ratingReview: string;
	catagory: string;
	brand: string;
	condition: 'new' | 'used';
	likes: IProductLike[];
	reviews: IProductReview[];
	views: IProductView[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductChart {
	products: IProduct[];
	subTotal: number;
	total: number;
}

export interface IProductLike {
	id: string;
	uid: string;
	liked: boolean;
}
export interface IProductView {
	id: string;
	uid: number[];
}
export interface IProductReview {
	id: string;
	uid: string;
	rating: number;
}
export interface IProductComment {
	id: string;
	uid: string;
	pid: string;
	comment: string;
	edited: boolean;
	createdAt?: string;
	updatedAt?: string;
}


export interface IProductStore {
	id: string;
	name: string;
	adress: string;
	employees: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductTransacion extends IProductChart {
	uid: string;
	sid: string;
	status: 'open' | 'pending' | 'done';
	createdAt: string;
	updatedAt: string;
}