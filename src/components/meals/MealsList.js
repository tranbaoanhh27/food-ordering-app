import React from "react";
import { DEFAULT_MEALS } from "../../data/default-meals";
import Card from "../ui/Card";
import styled from "styled-components";
import MealItem from "./MealItem";

const MealsList = () => {
    return (
        <MealsSection>
            <Card>
                <ul>
                    {DEFAULT_MEALS.map((meal) => (
                        <MealItem key={meal.id} meal={{ ...meal }} />
                    ))}
                </ul>
            </Card>
        </MealsSection>
    );
};

export default MealsList;

// Styled Components
const MealsSection = styled.section`
    max-width: 60rem;
    width: 90%;
    margin: 2rem auto;
    animation: meals-appear 1s ease-out forwards;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    @keyframes meals-appear {
        from {
            opacity: 0;
            transform: translateY(3rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
