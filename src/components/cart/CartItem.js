import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../context/cart-context";

/**
 * Functional component representing a list item in Cart.
 * @param {Object} item An object representing an item in cart, keys = {id: string, name: string, price: number, description: string, quantity: number}
 * @returns {JSX} A JSX Element to render the list item
 */
const CartItem = (props) => {
    const cartContext = useContext(CartContext);

    const addMoreToCart = () => cartContext.onAddToCart(props.item, 1);

    const removeOneFromCart = () => cartContext.onRemoveFromCart(props.item.id, 1);

    return (
        <ListItem>
            <div>
                <h2>{props.item.name}</h2>
                <ItemSummary>
                    <ItemPrice>{`$${props.item.price.toFixed(2)}`}</ItemPrice>
                    <ItemQuantity>{`x${props.item.quantity}`}</ItemQuantity>
                </ItemSummary>
            </div>
            <ActionButtons>
                <button onClick={removeOneFromCart}>-</button>
                <button onClick={addMoreToCart}>+</button>
            </ActionButtons>
        </ListItem>
    );
};

export default CartItem;

// Styled Components
const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #8a2b06;
    padding: 1rem 0;
    margin: 1rem 0;

    & h2 {
        margin: 0 0 0.5rem 0;
        color: #363636;
    }

    button {
        font: inherit;
        font-weight: bold;
        font-size: 1.25rem;
        color: #8a2b06;
        border: 1px solid #8a2b06;
        width: 3rem;
        text-align: center;
        border-radius: 6px;
        background-color: transparent;
        cursor: pointer;
        margin-left: 1rem;
        margin: 0.25rem;
    }

    & button:hover,
    & button:active {
        background-color: #8a2b06;
        color: white;
    }
`;

const ItemSummary = styled.div`
    width: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ItemPrice = styled.span`
    font-weight: bold;
    color: #8a2b06;
`;

const ItemQuantity = styled.span`
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    color: #363636;
`;

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;
