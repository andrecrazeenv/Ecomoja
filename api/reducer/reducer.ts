import { UIState, CartItem } from '@/types/AppTypes';
import { Product } from '@/types/Product';

type AddProductToCart = {
	type: 'ADD_PRODUCT_TO_CART';
	payload: Product;
};

type RemoveProductFromCart = {
	type: 'REMOVE_PRODUCT_FROM_CART';
	payload: Product;
};

type SetShopByCategory = {
	type: 'SET_SHOP_BY_CATEGORY';
	payload: boolean;
};

export type UIAction =
	| AddProductToCart
	| SetShopByCategory
	| RemoveProductFromCart;

const reducer = (state: UIState, action: UIAction): UIState => {
	if (action.type === 'SET_SHOP_BY_CATEGORY') {
		return {
			...state,
			isShopByCategoryCollapsed: action.payload,
		};
	}

	if (action.type === 'ADD_PRODUCT_TO_CART') {
		const { cartItems } = state;
		const submittedCartItems = cartItems.filter(
			(cartItem) => cartItem.id === action.payload.id,
		);

		let newCartItems: CartItem[];

		if (submittedCartItems.length === 0) {
			const cartItem: CartItem = {
				id: action.payload.id,
				product: action.payload,
				productInstances: 1,
			};
			newCartItems = [...state.cartItems, cartItem];
		} else {
			const cartItem = {
				...submittedCartItems[0],
				productInstances: submittedCartItems[0].productInstances + 1,
			};
			newCartItems = state.cartItems.filter(
				(item) => item.id !== action.payload.id,
			);

			newCartItems.push(cartItem);
		}

		return {
			...state,
			cartItems: newCartItems,
		};
	}

	if (action.type === 'REMOVE_PRODUCT_FROM_CART') {
		// we're comparing carItem's id (item.id) to product's id (action.payload.id)
		// because a cartItem has the same id as the product it contains
		const newCartItems = state.cartItems.filter(
			(item) => item.id !== action.payload.id,
		);
		return {
			...state,
			cartItems: newCartItems,
		};
	}

	return { ...state };
};

export default reducer;