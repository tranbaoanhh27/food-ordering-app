import React, { useCallback, useEffect, useState } from "react";
import Card from "../ui/Card";
import styled from "styled-components";
import MealItem from "./MealItem";
import useFetch from "../../hooks/use-fetch";

import ENDPOINT from "../../constants/api-endpoints";
import Loader from "../ui/Loader";

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const [doFetchMeals, isFetchingMeals, fetchMealsHasError] = useFetch();

    const fetchMeals = useCallback(async () => {
        const data = await doFetchMeals(ENDPOINT.MEALS);
        if (data) setMeals(data);
    }, [doFetchMeals]);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    useEffect(() => {
        if (fetchMealsHasError) alert(fetchMealsHasError.message);
    }, [fetchMealsHasError]);

    return (
        <MealsSection>
            {!isFetchingMeals && (
                <Card>
                    <ul>
                        {meals.map((meal) => (
                            <MealItem key={meal.id} meal={{ ...meal }} />
                        ))}
                    </ul>
                </Card>
            )}
            {isFetchingMeals && (
                <CenterBlock>
                    <Loader size="60px" />
                </CenterBlock>
            )}
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

const CenterBlock = styled.div`
    display: flex;
    justify-content: center;
`;
