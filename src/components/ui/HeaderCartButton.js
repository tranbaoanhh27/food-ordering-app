import React, { Fragment, useContext, useEffect, useState } from "react";
import CartIcon from "../../assets/CartIcon.js";
import styled from "styled-components";
import Cart from "../cart/Cart.js";
import CartContext from "../../context/cart-context.js";

const HeaderCartButton = () => {
    const cartContext = useContext(CartContext);
    const [bumpAnimation, setBumpAnimation] = useState(false);

    useEffect(() => {
        if (cartContext.cartItemCount !== 0) setBumpAnimation(true);
        const timer = setTimeout(() => setBumpAnimation(false), 300);
        return () => {
            clearTimeout(timer);
        };
    }, [cartContext.cartItemCount]);

    return (
        <Fragment>
            {cartContext.isCartOpening && <Cart />}
            <Button onClick={cartContext.onOpenCart} bump={bumpAnimation}>
                <Icon>
                    <CartIcon />
                </Icon>
                <span>Giỏ hàng</span>
                <Badge>{cartContext.cartItemCount}</Badge>
            </Button>
        </Fragment>
    );
};

export default HeaderCartButton;

// Styled Components
const Badge = styled.span`
    background-color: #b94517;
    padding: 0.25rem 1rem;
    border-radius: 25px;
    margin-left: 1rem;
    font-weight: bold;
`;

const Button = styled.button`
    cursor: pointer;
    font: inherit;
    border: none;
    background-color: #4d1601;
    color: white;
    padding: 0.75rem 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 25px;
    font-weight: bold;
    animation: ${(props) => (props.bump ? "bump 300ms ease-out" : "none")};

    &:hover,
    :active {
        background-color: #2c0d00;
    }

    &:hover ${Badge}, :active ${Badge} {
        background-color: #92320c;
    }

    @keyframes bump {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const Icon = styled.span`
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 0.5rem;
`;
