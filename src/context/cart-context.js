import React, { useState } from "react";
import { DEFAULT_MEALS } from "../data/default-meals";

const CartContext = React.createContext({
    isCartOpening: false,
    onCloseCart: () => {},
    onOpenCart: () => {},
    cartItems: [],
    cartItemCount: 0,
    totalPrice: 0,
    onAddToCart: (mealId, quantity) => {},
    onRemoveFromCart: (mealId, quantity) => {},
});

export default CartContext;

export const CartContextProvider = (props) => {
    const [isCartOpening, setIsCartOpening] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [cartItems, setCartItems] = useState(
        DEFAULT_MEALS.map((meal) => {
            return { ...meal, quantity: 0 };
        })
    );

    const onCloseCart = () => {
        setIsCartOpening(false);
    };

    const onOpenCart = () => {
        setIsCartOpening(true);
    };

    const addToCartItems = (mealId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map((meal) => {
                if (meal.id === mealId) {
                    meal.quantity += quantity;
                    setTotalPrice((prev) => prev + meal.price * quantity);
                    setItemCount((prev) => prev + 1);
                }
                return meal;
            });
        });
    };

    const removeFromCartItems = (mealId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map((meal) => {
                if (meal.id === mealId && meal.quantity >= quantity) {
                    meal.quantity -= quantity;
                    setTotalPrice((prev) => prev - meal.price * quantity);
                    setItemCount((prev) => prev - 1);
                }
                return meal;
            });
        });
    };

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
