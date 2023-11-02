import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/imgs/logo.png'
import Btn from "../btn/Btn";
import GradeIcon from '@mui/icons-material/Grade';
import profileImg from '../../assets/imgs/profileImg.png'
import EditIcon from '@mui/icons-material/Edit';







export default function NavBar({ active, isLoggedIn }) {
    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');
    let [activeLink, setActiveLink] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        menu ? setActiveMenu('navLinks') : setActiveMenu("navLinks active")
    }, [menu])

    useEffect(() => {
        setActiveLink(active)
    }, [])





    return (
        <>
            <div className="navBar">
                <img onClick={() => navigate('/')} src={logo} className="logo-nb" />

                <div>
                    <div className={activeMenu}>
                        <div
                            className={activeLink === 'Inicio' ? "link-nb" : "link-nb1"}
                        >Inicio</div>
                        {!isLoggedIn && <div
                            className="link-nb"
                        >Empresas</div>}
                        <div
                            className="link-nb"
                            onClick={() => navigate('/wishlist')}
                        >Lista de pedidos</div>
                        {isLoggedIn && <>
                            <div className="link-nb">Sobre nós</div>
                            <div className="link-nb">Sair</div>
                            <Btn label='Ver pedidos favoritos'
                                afterIcon={<GradeIcon sx={{ color: '#FF9C1B' }} />}
                                style={{ border: '2px solid #FF9C1B', borderRadius: '50px' }} />
                            <div className="wishlist-profile1">
                                <img src={profileImg} className="wishlist-profile-img1" />
                                <div>
                                    <div className="wishlist-profile-name1">Transsol mudanças
                                        <span><EditIcon sx={{ fontSize: '16px' }} /></span>
                                    </div>
                                    <div className="wishlist-profile-number1">55 (48) 3524-8547</div>
                                </div>
                            </div>
                        </>}
                        {!isLoggedIn && <>
                            <div
                                className="link-nb"
                            >Realize seu orçamento</div>
                            <Btn label='Cadastre a sua empresa' style={{ border: '2px solid white' }} />
                            <Btn label='Login' style={{ backgroundColor: 'white', color: '#0026AB', fontSize: '20px' }} />
                        </>}
                    </div>
                    <div className="icon">
                        {menu ? <MenuIcon sx={{ color: 'white' }} onClick={() => setMenu(!menu)} /> : <CloseIcon sx={{ color: 'white' }} onClick={() => setMenu(!menu)} />}
                    </div>
                </div>

            </div>
        </>
    )
} 