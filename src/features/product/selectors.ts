import { RootState } from 'app/store';
import { IProduct } from './types';

export default {
  selectProducts: (state: RootState) => state.product.products,
  selectFilterableProducts: (state: RootState) => state.product.filterableProducts,
  selectLoadingProducts: (state: RootState) => state.product.loadingProducts,
  selectProdcutsLoaded: (state: RootState) => state.product.prodcutsLoaded,
  selectChartTotal: (state: RootState) => {
    let total = 0;
    for(const chart in state.product.chart) {
      total += state.product.chart[chart].total
    }
    return total
  },
  selectChartProductQty: (state: RootState) => {
    let total = 0;
    for(const chart in state.product.chart) {
      total += state.product.chart[chart].products.length
    }
    return total
  },
  selectDistinctProductCatagorys: (state: RootState): string[] => {
    const catagorySet: Set<string> = new Set();
    state.product.products.forEach((product:IProduct) => {
      catagorySet.add(product.catagory);
    })
    const catagorys: string[] = Array.from(catagorySet);
    catagorys.unshift('');
    return catagorys;
  } 
}
