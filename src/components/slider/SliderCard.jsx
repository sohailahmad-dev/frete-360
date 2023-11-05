import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React from 'react'

export default function SliderCard({ content }) {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#FFC700',
        },
    });

    return (
        <div className='slider-card'>
            <div >
                <StyledRating name="read-only" value={5} readOnly />
                <div className="slider-card-heading">{content?.id} Beltrano da silva</div>
                <div className="slider-card-subHeading">São Paulo → Porto alegre</div>
                <q className="slider-card-description">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</q>
            </div>
        </div>
    )
}
