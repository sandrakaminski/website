import React, { createContext, useReducer, useEffect, useContext } from "react";

import { ProductTypes, CartState } from "@/types";

export enum ActionTypes {
    ADD = "ADD",
    REMOVE = "REMOVE",
    INC = "INC",
    DEC = "DEC",
    CLEAR = "CLEAR",
}

type CartAction =
    | {
          type: ActionTypes.ADD;
          id: string;
          amount: number;
          product: ProductTypes;
      }
    | { type: ActionTypes.REMOVE; id: string }
    | { type: ActionTypes.INC; id: string }
    | { type: ActionTypes.DEC; id: string }
    | { type: ActionTypes.CLEAR };

const getLocalStorage = (): CartState => {
    const stored = localStorage.getItem("cartState");
    if (stored) return JSON.parse(stored);
    return { cart: [], amount: 0, total: 0 };
};

const initialState: CartState = getLocalStorage();

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case ActionTypes.ADD: {
            const existing = state.cart.find((i) => i.productId === action.id);
            let newCart;

            if (existing) {
                newCart = state.cart.map((item) =>
                    item.productId === action.id
                        ? {
                              ...item,
                              amount:
                                  item.amount.length + 1 > item.max
                                      ? item.amount
                                      : [...item.amount, action.amount],
                          }
                        : item
                );
            } else {
                newCart = [
                    ...state.cart,
                    {
                        ...action.product,
                        productId: action.id,
                        amount: [action.amount],
                    },
                ];
            }

            return {
                ...state,
                cart: newCart,
                amount: newCart.reduce((acc, i) => acc + i.amount.length, 0),
                total: newCart.reduce(
                    (acc, i) => acc + i.amount.length * i.price,
                    0
                ),
            };
        }
        case ActionTypes.REMOVE: {
            const newCart = state.cart.filter((i) => i.productId !== action.id);
            return {
                ...state,
                cart: newCart,
                amount: newCart.reduce((acc, i) => acc + i.amount.length, 0),
                total: newCart.reduce(
                    (acc, i) => acc + i.amount.length * i.price,
                    0
                ),
            };
        }
        case ActionTypes.INC: {
            const newCart = state.cart.map((item) =>
                item.productId === action.id
                    ? { ...item, amount: [...item.amount, 1] }
                    : item
            );
            return {
                ...state,
                cart: newCart,
                amount: newCart.reduce((acc, i) => acc + i.amount.length, 0),
                total: newCart.reduce(
                    (acc, i) => acc + i.amount.length * i.price,
                    0
                ),
            };
        }
        case ActionTypes.DEC: {
            const newCart = state.cart.map((item) =>
                item.productId === action.id
                    ? { ...item, amount: item.amount.slice(0, -1) }
                    : item
            );
            return {
                ...state,
                cart: newCart,
                amount: newCart.reduce((acc, i) => acc + i.amount.length, 0),
                total: newCart.reduce(
                    (acc, i) => acc + i.amount.length * i.price,
                    0
                ),
            };
        }
        case ActionTypes.CLEAR:
            return { cart: [], amount: 0, total: 0 };
        default:
            return state;
    }
};

type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCartContext must be used within CartProvider");
    return context;
};
