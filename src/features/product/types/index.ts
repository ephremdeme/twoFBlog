
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
	ratingReview: string;
	catagory: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductChart {
	products: IProduct[];
	subTotal: number;
	total: number;
}

export interface IProductStore {
	id: string;
	name: string;
	adress: string;
	employees: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductReview {
	id: string;
	uid: string;
	rating: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductComment {
	id: string;
	uid: string;
	pid: string;
	comment: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductView {
	id: string;
	uis: string[];
}

export interface IProductLike {
	id: string;
	uid: string;
	liked: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface IProductTransacion extends IProductChart {
	id: string;
	uid: string;
	sid: string;
	status: 'open' | 'pending' | 'done';
	createdAt: string;
	updatedAt: string;
}