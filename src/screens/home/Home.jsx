import React, { useState } from 'react'
import './Home.css'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import arrow from '../../assets/imgs/home-arrow.png'
import Btn from '../../components/btn/Btn'
import card1 from '../../assets/imgs/card1.png'
import card2 from '../../assets/imgs/card2.png'
import card3 from '../../assets/imgs/card3.png'
import Slider from '../../components/slider/Slider'
import homeSec4 from '../../assets/imgs/homeSec4.png'
import FormHome from './formHome/FormHome'



export default function Home() {
    const reviews = [
        {
            id: '01'
        },
        {
            id: '02'
        },
        {
            id: '03'
        },
        {
            id: '04'
        },
        {
            id: '05'
        },
    ]

    return (
        <div>
            <NavBar />
            {/* Home section 1 */}

            <div className="home-sec1 content-padding">
                <Grid container spacing={5}>
                    <Grid item md={6} sm={12} >
                        <div className="home-sec1-heading">
                            Receba vários orçamentos
                            <div> para sua mudança! </div>
                        </div>
                        <div className="home-sec1-heading1">
                            Conheça a Frete Brasil é rápido, <br /> fácil e gratuito
                        </div>
                        <div className="home-sec1-subHeading">
                            Complete as etapas ao lado
                        </div>
                        <img className='home-sec1-arrow' src={arrow} alt="arrow" width='340px' />
                        <div className="home-sec1-semiCircle">

                            Gostaria de ver a <span>lista de pedidos?</span>
                            <Btn label='Login' style={{ backgroundColor: 'white', color: '#0026AB', fontSize: '17px', border: '2px solid #0026AB', height: '35px', width: "229px", marginTop: '25px' }} />
                        </div>

                    </Grid>
                    <Grid item md={6} xs={12} >
                        <div className="home-sec1-right">
                            <FormHome />

                            <div className="home-sec1-semiCircle1" >
                                Gostaria de ver a <span>lista de pedidos?</span>
                                <Btn label='Login' style={{ backgroundColor: 'white', color: '#0026AB', fontSize: '17px', border: '2px solid #0026AB', height: '35px', width: "229px", marginTop: '25px' }} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="wavy-div1" />

            {/* Home section 2  */}
            <div className="home-sec2 content-padding">
                <div className="home-sec2-heading">
                    Confie em quem <span>entende de frete</span>
                </div>
                <div className="home-sec2-subHeading">
                    Conheça a Frete Brasil é rápido, fácil e gratuito
                </div>
                <div className="home-sec2-cards">
                    <Grid container spacing={4}>
                        <Grid item md={4} sm={12} >
                            <div className="home-sec2-card">
                                <img src={card1} alt="card1" />
                                <div className="home-sec2-card-heading">
                                    Fretes com preços baixos
                                </div>
                                <div className="home-sec2-card-text">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={12} >
                            <div className="home-sec2-card">
                                <img src={card2} alt="card1" />
                                <div className="home-sec2-card-heading">
                                    Fretes com preços baixos
                                </div>
                                <div className="home-sec2-card-text">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={12} >
                            <div className="home-sec2-card">
                                <img src={card3} alt="card1" />
                                <div className="home-sec2-card-heading">
                                    Fretes com preços baixos
                                </div>
                                <div className="home-sec2-card-text">
                                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Btn label='Realize seu orcamento' style={{ width: '341px', maxWidth: '100%', margin: '40px auto' }} />
                </div>
            </div>
            <div className="wavy-div2" />

            {/* Home section 3  */}
            <div className="home-sec3 content-padding">
                <div className="home-sec3-heading">
                    Depoimentos de
                    <span> quem usa a Frete Brasil</span>
                </div>
                <div className="home-sec3-subHeading">
                    Conheça a Frete Brasil é rápido, fácil e gratuito
                </div>
                <div className="home-sec3-cards">
                    <Slider slides={reviews} />
                </div>
            </div>
            <div className="wavy-div3" />

            {/* Home section 4  */}
            <div className="home-sec4 content-padding">
                <Grid container spacing={5}>
                    <Grid item sm={5} xs={12}>
                        <div className="home-sec4-left">
                            <div className="home-sec4-heading">
                                Quer receber <span> mais <br /> pedidos de mudança?</span>
                            </div>
                            <div className="home-sec4-subHeading">
                                Cadastre sua empresa <br /> gratuitamente agora mesmo!
                            </div>
                            <div className="home-sec4-description">
                                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet dolor sit amet Lorem ipsum dolor sit amet dolor sit amet Lorem ipsum dolor
                            </div>
                        </div>
                        <div className="home-sec4-desktop-btns">
                            <Btn label='Cadastre sua empresa' style={{ width: '370px', maxWidth: '100%', marginTop: '50px', marginBottom: '15px' }} />
                            <Btn label='Ver lista de pedidos' style={{ width: '370px', maxWidth: '100%', border: '2px solid #0026AB', color: '#0026AB', backgroundColor: 'white' }} />
                        </div>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <div className="home-sec4-right">
                            <img src={homeSec4} className='home-sec4-img' alt="home-sec4-img" />
                        </div>
                        <div className="home-sec4-mobile-btns">
                            <Btn label='Cadastre sua empresa' style={{ width: '370px', maxWidth: '100%', marginTop: '50px', marginBottom: '15px' }} />
                            <Btn label='Ver lista de pedidos' style={{ width: '370px', maxWidth: '100%', border: '2px solid #0026AB', color: '#0026AB', backgroundColor: 'white' }} />
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    )
}
