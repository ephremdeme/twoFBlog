import { collection } from 'rxfire/firestore';
import { getCollection } from "app/hooks";
import { setLoadingProducts, setProducts } from "./index";
import { map } from 'rxjs/operators'
import { AppThunk } from "app/store";
import {PDB} from './init';

export const fetchProducts = (): AppThunk => async (dispatch, getState) => {
  const products$ = getCollection(PDB.PRODCUTS)

  dispatch(setLoadingProducts(true))
  collection(products$)
  .pipe(
    map(docs => docs.map(d => ({ ...d.data(), id: d.id })))
  )
  .subscribe((products: any) => {
    console.log('Products data: ', products)
    dispatch(setLoadingProducts(false))
    dispatch(setProducts(products))
  })
}
