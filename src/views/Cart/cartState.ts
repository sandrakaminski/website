import { atom, selector } from 'recoil';

import { ProductTypes, CartState } from "@/types";

export enum ActionTypes {
    INC = "INC",
    DEC = "DEC",
}

const getLocalStorage = (): ProductTypes[] => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

export const cartState = atom<CartState>({
    key: 'cartState',
    default: {
        cart: getLocalStorage(),
        amount: 0,
        total: 0,
    },
});

export const cartTotalSelector = selector({
    key: 'cartTotalSelector',
    get: ({ get }) => {
        const state = get(cartState);
        const total = state.cart.reduce((acc, item) => acc + item.amount.length * item.price, 0);
        const amount = state.cart.reduce((acc, item) => acc + item.amount.length, 0);
        return { total, amount };
    },
});
