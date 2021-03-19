import { RootState } from 'app/store';

export default {
  selectProducts: (state: RootState) => state.product.products,
  selectLoadingProducts: (state: RootState) => state.product.loadingProducts,
  selectProdcutsLoaded: (state: RootState) => state.product.prodcutsLoaded  
}
