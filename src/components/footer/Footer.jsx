import React from 'react'
import './Footer.css'
import logo from '../../assets/imgs/logo.png'
import instagram from '../../assets/imgs/instagram.png'
import whatsapp from '../../assets/imgs/whatsapp.png'

import { Grid } from '@mui/material'

export default function Footer({ bgColor = '#F7F7FF' }) {
    return (
        <div className='footer-main content-padding '>
            <Grid container spacing={5}>
                <Grid item sm={5} xs={12}>
                    <div className="footer-left">
                        <div className="footer-logo-box">
                            <img src={logo} alt="logo" />
                            <div >Frete</div>
                            <div style={{ color: '#FF9C1B' }}>Brasil</div>
                        </div>
                        <div className='footer-social'>
                            <img src={whatsapp} className='footer-social-img' alt="whatsapp" />
                            <img src={instagram} className='footer-social-img' alt="instagram" />
                        </div>
                        <div className="footer-left-description">
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="footer-center">
                        <div className="footer-main-link">
                            Vai se mudar?
                        </div>
                        <div className="footer-link">Realize seu orçamento</div>
                        <div className="footer-link">Consulte empresas</div>
                        <div className="footer-link">FAQ</div>
                        <div className="footer-link">Login</div>
                    </div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <div className="footer-center">
                        <div className="footer-main-link">
                            Termos de uso
                        </div>
                        <div className="footer-link">Transportadores</div>
                        <div className="footer-link">Políticas de privacidade</div>
                        <div className="footer-link">Usuários</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
