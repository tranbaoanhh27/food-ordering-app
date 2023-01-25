import React, { useContext } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../ui/Modal";
import styled from "styled-components";
import CartItem from "./CartItem";

const Cart = () => {
    const cartContext = useContext(CartContext);

    return (
        <Modal onClose={cartContext.onCloseCart}>
            <main>
                <CartItems>
                    {cartContext.cartItems
                        .filter((item) => item.quantity > 0)
                        .map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                </CartItems>
                <TotalPrice>
                    <h5>Tổng sô tiên:</h5>
                    <h5>{`$${cartContext.totalPrice.toFixed(2)}`}</h5>
                </TotalPrice>
            </main>
            <Actions>
                <button onClick={cartContext.onCloseCart}>Đóng</button>
                {cartContext.cartItemCount !== 0 && <ConfirmButton>Đặt hàng</ConfirmButton>}
            </Actions>
        </Modal>
    );
};

export default Cart;

// Styled Components
const CartItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 20rem;
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
