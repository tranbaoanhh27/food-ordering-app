import React from "react";
import styled from "styled-components";

const MealsSummary = () => {
    return (
        <Summary>
            <h2>Những món ăn tuyệt hảo, sẵn sàng được giao đến bàn ăn của bạn!</h2>
            <p>
                Tât cả các món ăn của chúng tôi đêu được nâu với các nguyên liệu thượng hạng, tươi ngon và dĩ nhiên, bởi
                các đâu bếp hàng đâu!
            </p>
            <p>Đơn giản là chọn món và thưởng thuc chúng ngay tại nhà bạn!</p>
        </Summary>
    );
};

export default MealsSummary;

// Styled Components
const Summary = styled.section`
    text-align: center;
    max-width: 45rem;
    width: 90%;
    margin: auto;
    margin-top: -10rem;
    position: relative;
    background-color: #383838;
    color: white;
    border-radius: 14px;
    padding: 1rem;
    box-shadow: 0 1px 18px 10px rgba(0, 0, 0, 0.25);

    h2 {
        font-size: 2rem;
        margin-top: 0;
    }

    p {
        padding-inline: 4rem;
    }
`;
