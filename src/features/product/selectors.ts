import { RootState } from 'app/store';

export default {
  selectProducts: (state: RootState) => state.product.products,
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
  }
}
