import React, { useCallback, useEffect, useState } from "react";
import ENDPOINT from "../constants/api-endpoints";
import useFetch from "../hooks/use-fetch";

const CartContext = React.createContext({
    isCartOpening: false,
    onCloseCart: () => {},
    onOpenCart: () => {},
    cartItems: [],
    cartItemCount: 0,
    totalPrice: 0,
    onAddToCart: (meal, quantity) => {},
    onRemoveFromCart: (mealId, quantity) => {},
});

export default CartContext;

export const CartContextProvider = (props) => {
    const [isCartOpening, setIsCartOpening] = useState(false);
    const [itemCount, setItemCount] = useState(undefined);
    const [totalPrice, setTotalPrice] = useState(undefined);
    const [cartItems, setCartItems] = useState(undefined);

    const [doFetchCart, isFetchingCart, errorFetchCart] = useFetch();

    const uploadData = useCallback(async () => {
        const data = { itemCount, totalPrice, cartItems };
        await doFetchCart(ENDPOINT.CART, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }, [itemCount, totalPrice, cartItems, doFetchCart]);

    const downloadData = useCallback(async () => {
        const data = await doFetchCart(ENDPOINT.CART);
        setCartItems(data.cartItems || []);
        setItemCount(data.itemCount || 0);
        setTotalPrice(data.totalPrice || 0);
    }, [doFetchCart]);

    const onCloseCart = () => {
        setIsCartOpening(false);
    };

    const onOpenCart = () => {
        setIsCartOpening(true);
    };

    const addToCartItems = (meal, quantity) => {
        setTotalPrice((prev) => prev + meal.price * quantity);
        setItemCount((prev) => prev + quantity);
        setCartItems((prevItems) => {
            const exist = prevItems.findIndex((item) => item.id === meal.id) !== -1;
            if (!exist) return [...prevItems, { ...meal, quantity: quantity }];
            return prevItems.map((item) => {
                if (item.id === meal.id) item.quantity += quantity;
                return item;
            });
        });
    };

    const removeFromCartItems = (mealId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems
                .map((meal) => {
                    if (meal.id === mealId && meal.quantity >= quantity) {
                        meal.quantity -= quantity;
                        setTotalPrice((prev) => prev - meal.price * quantity);
                        setItemCount((prev) => prev - 1);
                    }
                    return meal;
                })
                .filter((item) => item.quantity > 0);
        });
    };

    useEffect(() => {
        downloadData();
    }, [downloadData]);

    useEffect(() => {
        if (itemCount !== undefined && cartItems !== undefined && totalPrice !== undefined) uploadData();
    }, [itemCount, cartItems, totalPrice, uploadData]);

    useEffect(() => {
        if (errorFetchCart) alert(errorFetchCart.message);
    }, [errorFetchCart]);

    return (
        <CartContext.Provider
            value={{
                isCartOpening: isCartOpening,
                onCloseCart: onCloseCart,
                onOpenCart: onOpenCart,
                cartItems: cartItems,
                cartItemCount: itemCount,
                totalPrice: totalPrice,
                onAddToCart: addToCartItems,
                onRemoveFromCart: removeFromCartItems,
            }}>
            {props.children}
        </CartContext.Provider>
    );
};
