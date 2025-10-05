import { ProductTypes } from "@/types";

type Amount = {
    shipping: number;
    total: number;
    currency?: string;
};

export const useCartHooks = () => {
    // list of countries
    const countriesList = {
        AU: { name: "Australia", code: 0 },
        CA: { name: "Canada", code: 1 },
        CZ: { name: "Czechia", code: 2 },
        FR: { name: "France", code: 3 },
        IT: { name: "Italy", code: 4 },
        JP: { name: "Japan", code: 5 },
        NZ: { name: "New Zealand", code: 6 },
        NO: { name: "Norway", code: 7 },
        TW: { name: "Taiwan", code: 8 },
        GB: { name: "United Kingdom", code: 9 },
        US: { name: "United States", code: 10 },
    };

    // standard shipping costs for each country
    const shippingCosts = (country: string): number => {
        switch (country) {
            case "AU":
                return 24;
            case "CA":
                return 23;
            case "CZ":
                return 34;
            case "FR":
                return 34;
            case "IT":
                return 36;
            case "JP":
                return 21;
            case "NZ":
                return 11;
            case "NO":
                return 42;
            case "TW":
                return 13;
            case "GB":
                return 50.11;
            case "US":
                return 31.82;
            default:
                return 11;
        }
    };

    // custom shipping price for paper products
    const paperProductShipping = (country: string): number | undefined => {
        return country === "NZ" ? 5.95 : undefined;
    };

    // currency symbols
    const symbols = (country: string): string => {
        switch (country) {
            case "AU":
                return "$";
            case "CA":
                return "$";
            case "CZ":
                return "Kč";
            case "FR":
                return "€";
            case "IT":
                return "€";
            case "JP":
                return "¥";
            case "NZ":
                return "$";
            case "NO":
                return "kr";
            case "TW":
                return "NT$";
            case "GB":
                return "£";
            case "US":
                return "$";
            default:
                return "$";
        }
    };

    // set currency of country
    const currencyTypes = (country: string): string => {
        switch (country) {
            case "AU":
                return "AUD";
            case "CA":
                return "CAD";
            case "CZ":
                return "CZK";
            case "FR":
                return "EUR";
            case "IT":
                return "EUR";
            case "JP":
                return "JPY";
            case "NZ":
                return "NZD";
            case "NO":
                return "NOK";
            case "TW":
                return "TWD";
            case "GB":
                return "GBP";
            case "US":
                return "USD";
            default:
                return "NZD";
        }
    };


    const exchangeRate = (country: string, price: number): number => {
        switch (country) {
            case "AUD": return 0.92 * price;
            case "CAD": return 0.82 * price;
            case "CZK": return 14.27 * price;
            case "EUR": return 0.55 * price;
            case "JPY": return 89.5 * price;
            case "NZD": return 1 * price;
            case "NOK": return 6.62 * price;
            case "TWD": return 19.13 * price;
            case "GBP": return 0.48 * price;
            case "USD": return 0.61 * price;
            default: return price;
        }
    };

    type AmountProps = {
        country: string;
        amount: Amount;
    };

    // float to int conversion for Japan 
    const handleJapanShipping = (props: AmountProps): string => {
        const { country, amount } = props;

        let shipping;
        if (!amount.shipping) {
            shipping = "";
        } else {
            if (country === "JP") {
                shipping = amount.shipping.toFixed(0);
            } else {
                shipping =
                    Number(amount.shipping.toFixed(2)) * 100;
            }
        }
        return (shipping as string);
    };

    type ShippingFeeProps = {
        country: string;
        category: string[];
        quantity: number
    };

    // calculates shipping fee if there are multiple books in the cart
    const multipleBooks = (country: string, quantity: number): number => {
        const shippingCost = shippingCosts(country);

        if (country === "NZ") {
            // if there are 2 books in the cart, the shipping fee is still default
            if (quantity <= 2) {
                return shippingCost;
            }
            // if there are 3 books in the cart, the shipping fee is 15
            if (quantity === 3) {
                return 15;
            }
            // if there are 4+ books in the cart, the shipping fee is 20
            if (quantity >= 4) {
                return 20;
            }
        }
        return shippingCost * quantity
    }

    // reduces shipping fee for paper products if there is no book in the cart
    const shippingFee = (props: ShippingFeeProps): number => {
        const { country, category, quantity } = props;

        const PaperProductShipping = paperProductShipping(country);
        const shippingCost = multipleBooks(country, quantity);

        let shippingFee: number | undefined;
        if (category.includes(productCategories.wrappingPaper.name)) {
            shippingFee = 0;
        }
        if (category.includes(productCategories.postcards.name)) {
            shippingFee = PaperProductShipping;
        }
        if (category.includes(productCategories.books.name)) {
            shippingFee = shippingCost;
        }
        if (category.includes(productCategories.soap.name)) {
            shippingFee = shippingCost;
        }

        if (category.includes(productCategories.postcards.name) && category.includes(productCategories.stickers.name) && category.includes(productCategories.books.name) && category.includes(productCategories.wrappingPaper.name)) {
            shippingFee = shippingCost;
        } else {
            return shippingCost;
        }
        return Number(shippingFee);
    };

    type CheckProductTypeProps = {
        cart: ProductTypes[];
        category: string[];
    };

    // removes paper products from shipping fee if there is a book in the cart
    const checkProductType = (props: CheckProductTypeProps): number => {
        const { cart, category } = props;

        let quantity;
        if ((category.includes(productCategories.postcards.name), category.includes(productCategories.books.name), category.includes(productCategories.wrappingPaper.name), category.includes(productCategories.stickers.name))) {
            quantity = cart.filter((item) => item.category !== productCategories.postcards.name).map((item) => item.amount).reduce((a, b) => a + b.length, 0);
        } else {
            quantity = cart.map((item) => item.amount).reduce((a, b) => a + b.length, 0);
        }
        return quantity;
    };

    return {
        countriesList,
        symbols,
        currencyTypes,
        paperProductShipping,
        handleJapanShipping,
        shippingFee,
        checkProductType,
        exchangeRate,
    };
};

export const productCategories = {
    all: { name: "All Categories", value: "" },
    books: { name: "Books", value: "Books" },
    postcards: { name: "Postcards", value: "Postcards" },
    wrappingPaper: { name: "Wrapping Paper", value: "Wrapping Paper" },
    soap: { name: "Soap", value: "Soap" },
    stickers: { name: "Stickers", value: "Stickers" }
}