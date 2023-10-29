import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/imgs/logo.png'
import Btn from "../btn/Btn";






export default function NavBar({ active }) {
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
                        <div
                            className="link-nb"
                        >Empresas</div>
                        <div
                            className="link-nb"
                        >Lista de pedidos</div>
                        <div
                            className="link-nb"
                        >Realize seu orçamento</div>


                        <Btn label='Cadastre a sua empresa' style={{ border: '2px solid white' }} />
                        <Btn label='Login' style={{ backgroundColor: 'white', color: '#0026AB', fontSize: '20px' }} />
                    </div>
                    <div className="icon">
                        {menu ? <MenuIcon sx={{ color: 'white' }} onClick={() => setMenu(!menu)} /> : <CloseIcon sx={{ color: 'white' }} onClick={() => setMenu(!menu)} />}
                    </div>
                </div>

            </div>
        </>
    )
} 