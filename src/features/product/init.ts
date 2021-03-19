// firebase products collection names
export enum PDB {
	PRODCUTS='products',
	STORES='prodcut_store',
	COMMENTS='product_comment',
	LIKES='likes',
	REVIEWS='reviews',
	VIEWS='views'
}

export interface IProductState {
	loadingProducts: boolean;
	prodcutsLoaded: boolean;
	products: any[];
}

export const initialState: IProductState = {
	loadingProducts: false,
	prodcutsLoaded: false,
	products: [],
};