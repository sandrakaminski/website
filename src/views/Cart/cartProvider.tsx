/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, createContext, useContext, JSX } from "react";

import { useQuery } from "@tanstack/react-query";
import cloneDeep from "lodash.clonedeep";

type CartItem = {
    id: string;
    inStock: boolean;
    slug: string;
    name: string;
    amount: number[];
    image: string;
    price: string;
    max: number;
    nzShippingOnly: boolean;
    category: string;
};

type State = {
    cart: CartItem[];
    amount: number;
    total: number;
};

type Action = {
    type: string;
    payload: any;
};

const init: State = {
    cart: [],
    amount: 0,
    total: 0,
};

export const cartContext: React.Context<any> = createContext(init);

// Change amount of items in Cart (increase / decrease)
function changeAmount(state: State, action: Action, method: string): State {
    const newState = cloneDeep(state);
    const tempCart = state.cart.map((item: CartItem) => {
        if (item.id !== action.payload) {
            return item;
        }
        const remainder = () => {
            switch (method) {
                case "INC":
                    return item.amount.concat(1);
                case "DEC":
                    return item.amount.slice(0, -1);
                default:
                    throw new Error(`No Matching "${method}" - method type`);
            }
        };
        const newAmount = remainder();
        return { ...item, amount: newAmount };
    });

    newState.cart = tempCart;

    newState.amount = newState.cart.reduce(
        (acc: number, item: CartItem) => acc + item.amount.length,
        0
    );
    newState.total = newState.cart.reduce(
        (acc: number, item: CartItem) =>
            acc + item.amount.length * parseFloat(item.price),
        0
    );

    return newState;
}

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

        // Remove items from Cart
        case "REMOVE": {
            const newState = cloneDeep(state);
            const tempCart = state.cart.filter(
                (item: CartItem) => item.id !== action.payload
            );
            newState.cart = tempCart;
            newState.amount = newState.cart.reduce(
                (acc: number, item: CartItem) => acc + item.amount.length,
                0
            );
            newState.total = newState.cart.reduce(
                (acc: number, item: CartItem) =>
                    acc + item.amount.length * parseFloat(item.price),
                0
            );
            return newState;
        }

        // Add to cart
        case "CART": {
            const newState = cloneDeep(state);
            const { id, amount, product } = action.payload;
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
                nzShippingOnly: product.nzShippingOnly,
            };
            newState.cart = [...state.cart, newItem];
            newState.amount = newState.cart.reduce(
                (acc: number, item: CartItem) => acc + item.amount.length,
                0
            );
            newState.total = newState.cart.reduce(
                (acc: number, item: CartItem) =>
                    acc + item.amount.length * parseFloat(item.price),
                0
            );
            return newState;
        }

        //Increase amount of items
        case "INC": {
            return changeAmount(state, action, "INC");
        }

        //Decrease amount of items
        case "DEC": {
            return changeAmount(state, action, "DEC");
        }

        //Calculate total amount of items in Cart
        case "GET_TOTALS": {
            const newState = cloneDeep(state);
            let { total, amount }: State = state.cart.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount.length || 0;
                    cartTotal.total += itemTotal;
                    cartTotal.amount += amount;

                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            const totalAmount = Array.from(String(amount));
            amount = totalAmount.length || 0;
            total = parseFloat(total.toFixed(2));

            newState.total = total;
            newState.amount = amount;

            return newState;
        }
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

//Store cart data in local storage
const getLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
};

const initialState: State = {
    cart: getLocalStorage(),
    amount: 0,
    total: 0,
};

type CartProviderProps = {
    children: React.ReactNode;
};

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
            payload: undefined,
        });
    };

    const getTotal = (): CartItem[][] => {
        dispatch({
            type: "GET_TOTALS",
            payload: undefined,
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return [state.cart];
    };
    useQuery({
        queryKey: [state.cart],
        queryFn: getTotal,
        refetchOnWindowFocus: false,
    });

    return (
        <cartContext.Provider
            value={{ ...state, addToCart, clear, decrease, increase, remove }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(cartContext);
};
