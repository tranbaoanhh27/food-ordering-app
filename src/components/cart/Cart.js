import React, { useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../ui/Modal";
import styled from "styled-components";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
    const cartContext = useContext(CartContext);
    const [isOrdering, setIsOrdering] = useState(false);

    const startOrdering = () => setIsOrdering(true);
    const cancelOrdering = () => setIsOrdering(false);

    return (
        <Modal onClose={cartContext.onCloseCart}>
            <main>
                <CartItems>
                    {cartContext.cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </CartItems>
                <TotalPrice>
                    <h5>Tổng số tiền:</h5>
                    <h5>{`$${cartContext.totalPrice.toFixed(2)}`}</h5>
                </TotalPrice>
            </main>
            {isOrdering && <CheckoutForm onCancel={cancelOrdering} />}
            {!isOrdering && (
                <Actions>
                    <button onClick={cartContext.onCloseCart}>Đóng</button>
                    {cartContext.cartItemCount !== 0 && <ConfirmButton onClick={startOrdering}>Đặt hàng</ConfirmButton>}
                </Actions>
            )}
        </Modal>
    );
};

export default Cart;

// Styled Components

const CartItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 35vh;
    overflow: auto;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
`;

const Actions = styled.footer`
    text-align: right;

    & button {
        font: inherit;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #8a2b06;
        padding: 0.5rem 2rem;
        border-radius: 25px;
        margin-left: 1rem;
    }

    & button:hover,
    & button:active {
        background-color: #5a1a01;
        border-color: #5a1a01;
        color: white;
    }
`;

const ConfirmButton = styled.button`
    background: #5a1a01 !important;
    border: none !important;
    color: white !important;

    &:hover {
        background: #3a0900 !important;
    }
`;
