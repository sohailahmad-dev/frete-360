import React from 'react'
import './Wishlist.css'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import profileImg from '../../assets/imgs/profileImg.png'
import EditIcon from '@mui/icons-material/Edit';
import IconInputField from '../../components/iconInputField/IconInputField'
import GradeIcon from '@mui/icons-material/Grade';
import filterRight from '../../assets/imgs/filterRight.png'
import arrow from '../../assets/imgs/arrow.png'
import calendarIcon from '../../assets/imgs/calendarIcon.png'
import eyeIcon from '../../assets/imgs/eyeIcon.png'
import Btn from '../../components/btn/Btn'


export default function Wishlist() {
    let data = [1, 2, 3, 4]
    return (
        <>
            <NavBar />
            <div className="wishlist-main">
                <div className="wishlist-upper">
                    <Grid container spacing={5}>
                        <Grid item md={6} xs={12}>
                            <div className="wishlist-heading">Seja bem vindo novamente!</div>
                            <div className="wishlist-profile">
                                <img src={profileImg} className="wishlist-profile-img" />
                                <div>
                                    <div className="wishlist-profile-name">Transsol mudanças
                                        <span><EditIcon /></span>
                                    </div>
                                    <div className="wishlist-profile-number">55 (48) 3524-8547</div>
                                </div>

                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="wishlist-search-outer">
                                <IconInputField placeholder='Enter value' />
                            </div>
                            <div className="wishlist-btns">
                                <div className="wishlist-btn1">Lista de pedidos</div>
                                <div className="wishlist-btn2">
                                    Favoritos
                                    <span> <GradeIcon /></span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="wishlist-center">
                    <div className="wishlist-heading1">Lista de pedidos</div>
                    <img src={filterRight} alt="" />
                </div>
                <div className="wishlist-data">
                    <div className="wishlist-data-headings">
                        <Grid container spacing={1}>
                            <Grid item xs={1.25}>
                                Pedido
                            </Grid>
                            <Grid item xs={2.75}>
                                Origem
                            </Grid>
                            <Grid item xs={2}>
                                Destino
                            </Grid>
                            <Grid item xs={1.75}>
                                Data
                            </Grid>
                            <Grid item xs={4.25}>
                                Visualizações
                            </Grid>

                        </Grid>
                    </div>
                    {data.map((e) => {
                        return (
                            <div key={e} className="wishlist-data-values">
                                <Grid container spacing={1}>
                                    <Grid item xs={1.25}>
                                        <div className="wishlist-data-id">#12345</div>
                                    </Grid>
                                    <Grid item xs={2.75}>
                                        <div className="wihlist-data-origin">
                                            <div>
                                                <span>De:</span>
                                                Rio de janeiro / RJ
                                            </div>
                                            <img src={arrow} alt="arrow" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className="wihlist-data-origin">
                                            <div>
                                                <span>Para:</span>
                                                Juazeiro / BA
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={1.75}>
                                        <div className="wihlist-data-date">
                                            <img src={calendarIcon} alt="calendar" />
                                            <div>
                                                15/06/2023
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4.25}>
                                        <div className="wishlist-data-views">
                                            <div className="views-eyeBox">
                                                <img src={eyeIcon} alt="eyeIcon" />
                                                1/10
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Btn label='Visualizer' style={{ background: "#00B812", width: '153px' }} />
                                                <div className='fav-btn'>
                                                    <GradeIcon />
                                                </div>
                                            </div>

                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}
