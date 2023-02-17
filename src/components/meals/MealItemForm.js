import React, { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "../../context/cart-context";
import Input from "../ui/Input";

/**
 * Functional component representing a form to add meal item to cart
 * @param {string} mealId The ID of the meal
 * @returns {JSX} The JSX Element to render the form
 */
const MealItemForm = (props) => {
    const [quantity, setQuantity] = useState(1);
    const cartContext = useContext(CartContext);

    const submitHandler = (event) => {
        event.preventDefault();
        cartContext.onAddToCart(props.meal, quantity);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Input
                label="Số lượng"
                inputProps={{
                    id: props.meal.id,
                    type: "number",
                    min: 1,
                    step: 1,
                    value: quantity,
                    onChange: (event) => setQuantity(Number.parseInt(event.target.value)),
                }}
            />
            <button type="submit">+ Thêm</button>
        </Form>
    );
};

export default MealItemForm;

// Styled Components
const Form = styled.form`
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & button {
        font: inherit;
        cursor: pointer;
        background-color: #8a2b06;
        border: 1px solid #8a2b06;
        color: white;
        padding: 0.25rem 2rem;
        border-radius: 20px;
        font-weight: bold;
    }

    & button:hover,
    & button:active {
        background-color: #641e03;
        border-color: #641e03;
    }
`;
