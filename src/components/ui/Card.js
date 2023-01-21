import React from "react";
import styled from "styled-components";

const Card = (props) => {
    return <StyledCard style={props.style}>{props.children}</StyledCard>;
};

export default Card;

// Styled Components
const StyledCard = styled.div`
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    background-color: white;
`;
