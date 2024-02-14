import { ProductItems } from "@/types";

type Amount = {
    shipping: number;
    total: number;
    currency?: string;
};

export const useCartHooks = () => {
    type Init = {
        [key: string]: {
            name: string;
            code: number;
        };
    };

    // list of countries
    const countriesList: Init = {
        AU: { name: "Australia", code: 0 },
        CA: { name: "Canada", code: 1 },
        CL: { name: "Chile", code: 2 },
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
                return 44.92;
            case "CA":
                return 46.92;
            case "CL":
                return 31;
            case "FR":
                return 34.92;
            case "IT":
                return 36.92;
            case "JP":
                return 21;
            case "NZ":
                return 11;
            case "NO":
                return 42;
            case "TW":
                return 13;
            case "GB":
                return 32.92;
            case "US":
                return 37.92;
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
            case "CL":
                return "$";
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
            case "CL":
                return "CLP";
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

    // exact tax rate for each country
    const vat = (country: string): number => {
        switch (country) {
            case "AU":
                return 0;
            case "CA":
                return 0.05;
            case "CL":
                return 0.19;
            case "FR":
                return 0.22;
            case "IT":
                return 0.24;
            case "JP":
                return 0.1;
            case "NZ":
                return 0.15;
            case "NO":
                return 0.25;
            case "TW":
                return 0.05;
            case "GB":
                return 0.2;
            case "US":
                return 0;
            default:
                return 0.15;
        }
    };

    const exchangeRate = (country: string, price: number): number => {
        switch (country) {
            case "AUD":
                return 0.92 * price;
            case "CAD":
                return 0.82 * price;
            case "CLP":
                return 532.98 * price;
            case "EUR":
                return 0.55 * price;
            case "JPY":
                return 89.5 * price;
            case "NZD":
                return 1 * price;
            case "NOK":
                return 6.62 * price;
            case "TWD":
                return 19.13 * price;
            case "GBP":
                return 0.48 * price;
            case "USD":
                return 0.59 * price;
            default:
                return 1 * price;
        }
    };

    type AmountProps = {
        country: string;
        amount: Amount;
    };

    // float to int conversion for Japan and Chile
    const handleJapanChileShipping = (props: AmountProps): string => {
        const { country, amount } = props;

        let shipping;
        if (!amount.shipping) {
            shipping = "";
        } else {
            if (country === "CL" || country === "JP") {
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
    };

    // reduces shipping fee for paper products if there is no book in the cart
    const shippingFee = (props: ShippingFeeProps): number => {
        const { country, category } = props;

        const PaperProductShipping = paperProductShipping(country);
        const shippingCost = shippingCosts(country);

        let shippingFee: number | undefined;
        if (category.includes("Paper Products")) {
            shippingFee = PaperProductShipping;
        }
        if (category.includes("Book")) {
            shippingFee = shippingCost;
        }
        if (category.includes("Paper Products") && category.includes("Book")) {
            shippingFee = shippingCost;
        } else {
            shippingCost;
        }
        return Number(shippingFee);
    };

    type CheckProductTypeProps = {
        cart: ProductItems[];
        category: string;
    };

    // removes paper products from shipping fee if there is a book in the cart
    const checkProductType = (props: CheckProductTypeProps): number => {
        const { cart, category } = props;

        let quantity;
        if ((category.includes("Paper Products"), category.includes("Book"))) {
            quantity = cart
                .filter(
                    (item: ProductItems) => item.category !== "Paper Products"
                )
                .map((item: ProductItems) => item.amount.length)
                .reduce((a: number, b: number) => a + b, 0);
        } else {
            quantity = cart
                .map((item: ProductItems) => item.amount.length)
                .reduce((a: number, b: number) => a + b, 0);
        }
        return quantity;
    };

    return {
        countriesList,
        shippingCosts,
        symbols,
        currencyTypes,
        vat,
        paperProductShipping,
        handleJapanChileShipping,
        shippingFee,
        checkProductType,
        exchangeRate,
    };
};
