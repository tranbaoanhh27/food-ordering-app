import React, { Fragment } from "react";
import MealsList from "./MealsList";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
    return (
        <Fragment>
            <MealsSummary />
            <MealsList />
        </Fragment>
    );
};

export default Meals;
