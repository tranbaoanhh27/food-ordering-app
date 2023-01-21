import React, { useState } from "react";
import { DEFAULT_MEALS } from "../data/default-meals";

const CartContext = React.createContext({
    isCartOpening: false,
    onCloseCart: () => {},
    onOpenCart: () => {},
    cartItems: [],
    onAddToCart: (mealId, quantity) => {},
    onRemoveFromCart: (mealId, quantity) => {},
});

export default CartContext;

export const CartContextProvider = (props) => {
    const [isCartOpening, setIsCartOpening] = useState(false);

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
        console.log("add to cart: ", mealId, quantity);
        setCartItems((prevItems) => {
            return prevItems.map((meal) => {
                if (meal.id === mealId) {
                    console.log("CATCH!");
                    meal.quantity += quantity;
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
                onAddToCart: addToCartItems,
                onRemoveFromCart: removeFromCartItems,
            }}>
            {props.children}
        </CartContext.Provider>
    );
};
