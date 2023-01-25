import React, { Fragment } from "react";
import backgroundImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import styled from "styled-components";

const Header = () => {
    return (
        <Fragment>
            <StyledHeader>
                <h1>BAfood!</h1>
                <HeaderCartButton />
            </StyledHeader>
            <BackgroundImage>
                <img src={backgroundImage} alt="background of meals" />
            </BackgroundImage>
        </Fragment>
    );
};

export default Header;

// Styled Components
const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-color: #8a2b06;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 10;
`;

const BackgroundImage = styled.div`
    width: 100%;
    height: 25rem;
    z-index: 0;
    overflow: hidden;

    img {
        width: 110%;
        height: 100%;
        object-fit: cover;
        transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
    }
`;
