import React from "react";
import styled from "styled-components";

/**
 * Functional component representing a styled input element
 * @param {string} label The label for the input
 * @param {Object} inputProps Properties for the input element, just like default HTML input
 * @returns {JSX} The JSX Element to render the input element as a div
 */
const Input = (props) => {
    return (
        <Container>
            <label htmlFor={props.inputProps.id}>{props.label}</label>
            <input {...props.inputProps} />
        </Container>
    );
};

export default Input;

// Styled Components
const Container = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-start;
    margin-bottom: 0.5rem;

    label {
        font-weight: bold;
        margin-right: 1rem;
    }

    input {
        width: 3rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font: inherit;
        padding-left: 0.5rem;
        flex: 1;
    }
`;
