import React, { useEffect, useState } from 'react';
import Btn from '../btn/Btn'
import './Slider.css';
import SliderCard from './SliderCard';
import arrowLeft from '../../assets/imgs/arrowLeft.png'
import arrowRight from '../../assets/imgs/arrowRight.png'
import { Grid } from '@mui/material';

export default function Slider({ slides }) {

    let [currentSlide, setCurrentSlide] = useState(1);
    const totalSlides = slides?.length;

    const changeSlide = () => {
        (currentSlide === totalSlides) ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1);
    }

    useEffect(() => {
        let interval = setInterval(changeSlide, 5000);
        return () => clearInterval(interval);
    })

    const handlePreviousSlide = () => {
        if (currentSlide === 1) {
            setCurrentSlide(totalSlides)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const handleNextSlide = () => {
        if (currentSlide === totalSlides) {
            setCurrentSlide(1)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }


    return (
        <>
            <div className="slider-desktop">
                <Grid container spacing={5}>
                    {slides[currentSlide - 1] && <Grid item xs={12} sm={4}>
                        <SliderCard content={slides[currentSlide - 1]} />
                    </Grid>}
                    {slides[currentSlide] && <Grid item xs={12} sm={4}>
                        <SliderCard content={slides[currentSlide]} />
                    </Grid>}
                    {slides[currentSlide + 1] && <Grid item xs={12} sm={4}>
                        <SliderCard content={slides[currentSlide + 1]} />
                    </Grid>}

                </Grid>
            </div>
            <div className="slider-mobile">
                <Grid container spacing={5}>
                    {slides[currentSlide - 1] && <Grid item xs={12} sm={4}>
                        <SliderCard content={slides[currentSlide - 1]} />
                    </Grid>}
                </Grid>
            </div>
            <div className="slider-navigation">
                <img onClick={handlePreviousSlide} src={arrowLeft} alt="arrowLeft" />
                <div />
                <div />
                <div />
                <img onClick={handleNextSlide} src={arrowRight} alt="arrowRight" />
            </div>
            <Btn label='Realize seu orcamento' style={{ width: '341px', maxWidth: '100%', margin: '0px auto' }} />
        </>
    )
}

