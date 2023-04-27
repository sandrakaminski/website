/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import cloneDeep from 'lodash.clonedeep';

type CartItem = {
    id: string;
    inStock: boolean;
    slug: string;
    name: string;
    amount: number[] | any;
    image: string;
    price: string;
    max: number;
    nzShippingOnly: boolean;
    category: string;
}

type State = {
    cart: CartItem[];
    amount: number[] | any;
    total: number;
}

type Action = {
    type: string;
    payload: any;
};

const init: State = {
    cart: [],
    amount: 0,
    total: 0
};

export const cartContext: React.Context<any> = createContext(init);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        // Clear Cart
        case "CLEAR": {
            const newState = cloneDeep(state);
            newState.cart = [];
            newState.amount = 0;
            newState.total = 0;
            return newState;
        }

        //Remove items from Cart
        case "REMOVE": {
            const newState = cloneDeep(state);
            const tempCart = state.cart.filter((item: CartItem) => item.id !== action.payload);
            newState.cart = tempCart;
            newState.amount = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount, 0);
            newState.total = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount * parseFloat(item.price), 0);
            return newState;
        }

        //Add to cart
        case "CART": {
            const newState = cloneDeep(state);
            const { id, amount, product }: any = action.payload;
            const tempItem = state.cart.find((i: CartItem) => i.id === id);

            if (tempItem) {
                const tempCart = state.cart.map((cartItem: CartItem) => {
                    if (cartItem.id !== id) {
                        return cartItem;
                    }
                    let newAmount = cartItem.amount + amount;
                    if (newAmount > cartItem.max) {
                        newAmount = cartItem.max;
                    }
                    return { ...cartItem, amount: newAmount };
                });

                return { ...state, cart: tempCart };
            }
            const newItem: CartItem = {
                id: id,
                inStock: product.inStock,
                slug: product.slug,
                name: product.name,
                amount,
                category: product.category,
                image: product.featureImage,
                price: product.price,
                max: product.stock,
                nzShippingOnly: product.nzShippingOnly
            };
            newState.cart = [...state.cart, newItem];
            newState.amount = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount, 0);
            newState.total = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount * parseFloat(item.price), 0);
            return newState;
        }

        //Increase amount of items
        case "INC": {
            const newState = cloneDeep(state);
            const tempCart = state.cart.map((item: CartItem) => {
                if (item.id !== action.payload) {
                    return item
                }
                const newAmount = item.amount + 1;
                return { ...item, amount: newAmount };
            });

            newState.cart = tempCart;
            newState.amount = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount, 0);
            newState.total = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount * parseFloat(item.price), 0);
            return newState;
        }

        //Decrease amount of items
        case "DEC": {
            const newState = cloneDeep(state);
            const tempCart = state.cart.map((item: CartItem) => {
                if (item.id !== action.payload) {
                    return item
                }
                const remainder = item.amount.slice(0, -1);
                return { ...item, amount: remainder };

            });

            newState.cart = tempCart;
            newState.amount = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount.length, 0);
            newState.total = newState.cart.reduce((acc: number, item: CartItem) => acc + item.amount.length * parseFloat(item.price), 0);
            return newState;
        }

        //Calculate total amount of items in Cart
        case "GET_TOTALS": {
            const newState = cloneDeep(state);
            let { total, amount }: State = state.cart.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount.length || 0;
                    cartTotal.total += itemTotal
                    cartTotal.amount += amount;

                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            amount = amount.length || 0;
            total = parseFloat(total.toFixed(2));

            newState.total = total;
            newState.amount = amount;

            return newState;
        }
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
}

//Store cart data in local storage
const getLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
};

const initialState: State = {
    cart: getLocalStorage(),
    amount: 0,
    total: 0
};

type CartProviderProps = {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState && initialState);

    // add to cart
    const addToCart = (id: number, amount: number, product: CartItem): void => {
        dispatch({ type: "CART", payload: { id, amount, product } });
    };

    // remove
    const remove = (id: number): void => {
        dispatch({ type: "REMOVE", payload: id });
    };

    // increase
    const increase = (id: number): void => {
        dispatch({ type: "INC", payload: id });
    };

    // decrease
    const decrease = (id: number): void => {
        dispatch({ type: "DEC", payload: id });
    };

    // clear
    const clear = (): void => {
        dispatch({
            type: "CLEAR",
            payload: undefined
        });
    };

    const getTotal = (): CartItem[][] => {
        dispatch({
            type: "GET_TOTALS",
            payload: undefined
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return [state.cart]
    }
    useQuery([state.cart], getTotal, { refetchOnWindowFocus: false });

    return (
        <cartContext.Provider value={{ ...state, addToCart, clear, decrease, increase, remove }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(cartContext);
};