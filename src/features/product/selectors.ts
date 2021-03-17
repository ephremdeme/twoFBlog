import {IProductState} from './index';

export default {
  selectFilteredProducts: (state: IProductState) => state.filterableProducts
}