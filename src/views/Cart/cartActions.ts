import cloneDeep from "lodash.clonedeep";
import { useRecoilState, useRecoilValue } from 'recoil';

import { cartState, cartTotalSelector, ActionTypes } from './cartState';
import { ProductTypes, CartState } from "@/types";

const changeAmount = (state: CartState, id: string, method: string): void => {
    const tempCart = state.cart.map((item) => {
        if (item.productId !== id) {
            return item;
        }
        const remainder = () => {
            switch (method) {
                case ActionTypes.INC:
                    return item.amount.concat(1);
                case ActionTypes.DEC:
                    return item.amount.slice(0, -1);
                default:
                    throw new Error(`No Matching "${method}" - method type`);
            }
        };
        const newAmount = remainder();
        return { ...item, amount: newAmount };
    });

    state.cart = tempCart;
    state.amount = state.cart.reduce((acc: number, item) => acc + item.amount.length, 0);
    state.total = state.cart.reduce((acc: number, item) => acc + item.amount.length * item.price, 0);
};

export const useCartActions = () => {
    const [state, setState] = useRecoilState(cartState);

    const addToCart = (id: string, amount: number, product: ProductTypes) => {
        const tempItem = state.cart.find((i) => i.productId === id);
        const newState = cloneDeep(state);
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.productId !== id) {
                    return cartItem;
                }
                let newAmount = cartItem.amount.concat(amount);
                if (newAmount.length > cartItem.max) {
                    newAmount = cartItem.amount;
                }
                return { ...cartItem, amount: newAmount };
            });
            newState.cart = tempCart;
        } else {
            const newItem = {
                ...product,
                productId: id,
                amount: [amount],
            };
            newState.cart = [...state.cart, newItem];
        }
        newState.amount = newState.cart.reduce((acc, item) => acc + item.amount.length, 0);
        newState.total = newState.cart.reduce((acc, item) => acc + item.amount.length * item.price, 0);
        setState(newState);
        localStorage.setItem("cart", JSON.stringify(newState.cart));
    };

    const remove = (id: string) => {
        const newState = cloneDeep(state);
        const tempCart = state.cart.filter((item) => item.productId !== id);
        newState.cart = tempCart;
        newState.amount = newState.cart.reduce((acc, item) => acc + item.amount.length, 0);
        newState.total = newState.cart.reduce((acc, item) => acc + item.amount.length * item.price, 0);
        setState(newState);
        localStorage.setItem("cart", JSON.stringify(newState.cart));
    };

    const increase = (id: string) => {
        const newState = cloneDeep(state);
        changeAmount(newState, id, ActionTypes.INC);
        setState(newState);
        localStorage.setItem("cart", JSON.stringify(newState.cart));
    };

    const decrease = (id: string) => {
        const newState = cloneDeep(state);
        changeAmount(newState, id, ActionTypes.DEC);
        setState(newState);
        localStorage.setItem("cart", JSON.stringify(newState.cart));
    };

    const clear = () => {
        setState({
            cart: [],
            amount: 0,
            total: 0,
        });
        localStorage.removeItem("cart");
    };

    return { addToCart, remove, increase, decrease, clear };
};

export const useCartContext = () => {
    const state = useRecoilValue(cartState);
    const totals = useRecoilValue(cartTotalSelector);
    const { addToCart, remove, increase, decrease, clear } = useCartActions();

    return {
        state: { ...state, ...totals },
        addToCart,
        remove,
        increase,
        decrease,
        clear,
    };
};