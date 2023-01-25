import React from "react";
import styled from "styled-components";
import MealItemForm from "./MealItemForm";

/**
 * Functional component representing a list item in MealsList
 * @param {Object} meal An object representing a meal, keys = {id: string, name: string, price: number, description: string}
 * @returns {JSX} A JSX Element to render the list item
 */
const MealItem = (props) => {
    return (
        <Meal>
            <div>
                <h3>{props.meal.name}</h3>
                <Description>{props.meal.description}</Description>
                <Price>{`$${props.meal.price.toFixed(2)}`}</Price>
            </div>
            <MealItemForm mealId={props.meal.id} />
        </Meal>
    );
};

export default MealItem;

// Styled Components
const Meal = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;

    h3 {
        margin: 0 0 0.25rem 0;
    }
`;

const Description = styled.p`
    font-style: italic;
`;

const Price = styled.p`
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
`;
