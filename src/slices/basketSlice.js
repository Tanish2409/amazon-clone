import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			const itemIdx = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);

			if (itemIdx === -1) {
				state.items = [...state.items, { ...action.payload, count: 1 }];
			} else {
				const newBasket = state.items;

				newBasket[itemIdx] = {
					...newBasket[itemIdx],
					count: newBasket[itemIdx].count + 1,
				};

				state.items = newBasket;
			}
		},
		removeFromBasket: (state, action) => {
			const itemIdx = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);

			if (state.items[itemIdx].count > 1) {
				const newBasket = state.items;

				newBasket[itemIdx] = {
					...newBasket[itemIdx],
					count: newBasket[itemIdx].count - 1,
				};

				state.items = newBasket;
			} else {
				const newBasket = state.items;
				newBasket.splice(itemIdx, 1);

				state.items = newBasket;
			}
		},
	},
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotalPrice = (state) =>
	state.basket.items.reduce((total, item) => {
		return total + item.price * item.count;
	}, 0);

export const selectTotalCount = (state) =>
	state.basket.items.reduce((acc, item) => {
		return acc + item.count;
	}, 0);

export default basketSlice.reducer;
