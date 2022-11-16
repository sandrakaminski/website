import React, { useReducer, createContext, useEffect, useContext } from "react";

type State = {
    cart: CartItem[];
    amount: number[] | any;
    total: number;
}

type CartItem = {
    id: string;
    slug: string;
    name: string;
    amount: number[] | any;
    image: string;
    max: number;
}

type Action = {
    type: String;
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
            slug: product.slug,
            name: product.name,
            amount,
            image: product.featureImage,
            price: product.price,
            max: product.stock,
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
    const addToCart: Function = (id: number, amount: number, product: any) => {
        dispatch({ type: "CART", payload: { id, amount, product } });
    };

    // remove
    const remove: Function = (id: number) => {
        dispatch({ type: "REMOVE", payload: id });
    };

    // increase
    const increase: Function = (id: number) => {
        dispatch({ type: "INC", payload: id });
    };

    // decrease
    const decrease: Function = (id: number) => {
        dispatch({ type: "DEC", payload: id });
    };

    // clear
    const clear: Function = () => {
        dispatch({
            type: "CLEAR",
            payload: undefined
        });
    };

    useEffect(() => {
        dispatch({
            type: "GET_TOTALS",
            payload: undefined
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

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