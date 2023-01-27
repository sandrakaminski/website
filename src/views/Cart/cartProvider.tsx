/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

type State = {
    cart: CartItem[];
    amount: number[] | any;
    total: number;
}

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
}

type Action = {
    type: string;
    payload: any;
}

const init: State = {
    cart: [],
    amount: 0,
    total: 0
}
const cartContext: React.Context<any> = createContext(init);

const reducer = (state: State, action: Action) => {
    // Clear Cart
    if (action.type === "CLEAR") {
        return { ...state, cart: [] };
    }

    //Remove items from Cart
    if (action.type === "REMOVE") {
        const tempCart = state.cart.filter((item: CartItem) => item.id !== action.payload);
        return { ...state, cart: tempCart };
    }

    //Add to cart
    if (action.type === "CART") {
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
        const newItem = {
            id: id,
            inStock: product.inStock,
            slug: product.slug,
            name: product.name,
            amount,
            image: product.featureImage,
            price: product.price,
            max: product.stock,
            nzShippingOnly: product.nzShippingOnly
        };
        return { ...state, cart: [...state.cart, newItem] };
    }

    //Increase amount of items
    if (action.type === "INC") {
        const tempCart = state.cart.map((item: CartItem) => {
            if (item.id !== action.payload) {
                return item
            }
            const newAmount = item.amount + 1;
            return { ...item, amount: newAmount };
        });
        return { ...state, cart: tempCart };
    }

    //Decrease amount of items
    if (action.type === "DEC") {
        const tempCart = state.cart.map((item: CartItem) => {
            if (item.id !== action.payload) {
                return item
            }
            const remainder = item.amount.slice(0, -1);
            return { ...item, amount: remainder };

        });
        return { ...state, cart: tempCart };
    }

    //Calculate total amount of items in Cart
    if (action.type === "GET_TOTALS") {
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

        return { ...state, total, amount };
    }
    return state || init;
};

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
    total: 0,
};

type CartProviderProps = {
    children: React.ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState && initialState);

    // add to cart
    const addToCart: (id: number, amount: number, product: CartItem) => void = (id: number, amount: number, product: CartItem) => {
        dispatch({ type: "CART", payload: { id, amount, product } });
    };

    // remove
    const remove: (id: number) => void = (id: number) => {
        dispatch({ type: "REMOVE", payload: id });
    };

    // increase
    const increase: (id: number) => void = (id: number) => {
        dispatch({ type: "INC", payload: id });
    };

    // decrease
    const decrease: (id: number) => void = (id: number) => {
        dispatch({ type: "DEC", payload: id });
    };

    // clear
    const clear: () => void = () => {
        dispatch({
            type: "CLEAR",
            payload: undefined
        });
    };

    const getTotal = () => {
        dispatch({
            type: "GET_TOTALS",
            payload: undefined
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return state.cart
    }
    useQuery([state.cart], getTotal)

    return (
        <cartContext.Provider value={{ ...state, addToCart, clear, decrease, increase, remove }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(cartContext);
};

export { cartContext, CartProvider };