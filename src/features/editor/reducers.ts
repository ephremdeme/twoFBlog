import { AppThunk } from './../../app/store';

export default {
	// sample
	// incrementByAmount: (state, action: PayloadAction<number>) => {
	// 	state.value += action.payload;
	// }
}

// async actions sample
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };


// import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';

// export function Counter() {
//   const count = useSelector(selectCount);
//   const dispatch = useDispatch();

// onClick={() => dispatch(decrement())}
// onChange={e => setIncrementAmount(e.target.value)}
// dispatch(incrementByAmount(Number(incrementAmount) || 0))
// onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
// }        
