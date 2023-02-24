import React, { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import ENDPOINT from "../../constants/api-endpoints";
import CartContext from "../../context/cart-context";
import useFetch from "../../hooks/use-fetch";
import useInput from "../../hooks/use-input";
import Loader from "../ui/Loader";

const CheckoutForm = (props) => {
    const cartContext = useContext(CartContext);
    const validateName = useCallback((name) => name.trim().length > 0, []);

    const validatePhone = useCallback((phone) => {
        const len = phone.trim().length;
        return len > 0 && len < 12;
    }, []);

    const validateAddress = (address) => address.trim().length > 0;

    const [name, nameChangeHandler, nameBlurHandler, nameHasError, touchName] = useInput(validateName);
    const [phone, phoneChangeHandler, phoneBlurHandler, phoneHasError, touchPhone] = useInput(validatePhone);
    const [address, addressChangeHandler, addressBlurHandler, addressHasError, touchAddress] = useInput(validateAddress);
    const [doFetchOrders, isFetchingOrders, errorFetchOrders] = useFetch();

    const submitHandler = async (event) => {
        event.preventDefault();
        touchName();
        touchPhone();
        touchAddress();
        if (validateName(name) && validatePhone(phone) && validateAddress(address)) {
            const order = {
                customerName: name,
                customerPhoneNumber: phone,
                customerAddress: address,
                items: cartContext.cartItems,
                totalPrice: cartContext.totalPrice
            }
            const response = await doFetchOrders(ENDPOINT.ORDERS, {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                alert("Xin chúc mừng! Đã đặt hàng thành công!");
                cartContext.resetCart();
                props.onCancel();
            }
        }
    };

    useEffect(() => {
        if (errorFetchOrders) alert("Đặt hàng không thành công!\n" + errorFetchOrders.message);
    }, [errorFetchOrders]);

    return (
        <Container>
            <h3>Xác nhận đơn hàng</h3>
            <Form onSubmit={submitHandler}>
                <label htmlFor="name">Họ và tên:</label>
                <Input
                    id="name"
                    type="text"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={name}
                    hasError={nameHasError}
                />
                {nameHasError && <ErrorText>Họ và tên không được để trống!</ErrorText>}
                <label htmlFor="phone">Số điện thoại:</label>
                <Input
                    id="phone"
                    type="tel"
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    value={phone}
                    hasError={phoneHasError}
                />
                {phoneHasError && <ErrorText>Số điện thoại phải có từ 10 đến 11 kí số!</ErrorText>}
                <label htmlFor="address">Địa chỉ:</label>
                <Input
                    id="address"
                    type={"text"}
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                    value={address}
                    hasError={addressHasError}
                />
                {addressHasError && <ErrorText>Địa chỉ không được để trống!</ErrorText>}
                <Actions>
                    <button type="button" onClick={props.onCancel}>
                        Huỷ
                    </button>
                    {!isFetchingOrders && <ConfirmButton type="submit">Xác nhận</ConfirmButton>}
                    {isFetchingOrders && <Loader size="10px"/>}
                </Actions>
            </Form>
        </Container>
    );
};

export default CheckoutForm;

const Container = styled.div`
    text-align: center;
    max-height: 40vh;
    overflow-y: scroll;

    & h3 {
        margin-bottom: 0px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: start;

    & label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
`;

const Input = styled.input`
    border-radius: 7px;
    padding: 5px;
    border: ${(props) => (props.hasError ? "2px solid #ff0000aa" : "1px solid gray")};
    background: ${(props) => (props.hasError ? "pink" : "")};
`;

const ErrorText = styled.p`
    color: #ff0000bb;
    margin-top: 3px;
    margin-bottom: 0px;
    font-size: 90%;
`;

const ConfirmButton = styled.button`
    background: #8a2b06 !important;
    margin-inline-end: 0px !important;

    &:hover {
        background: #5a1a04 !important;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    overflow-x: hidden;

    & button {
        margin-inline-end: 2rem;
        border: none;
        padding-inline: 2rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 15px;
        background: gray;
        color: white;
    }

    & button:hover {
        cursor: pointer;
        background: #5f5f5f;
    }
`;
