import React, { useEffect, useState } from 'react';
import './Drawer.css'
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/img/logo.png'
// import IconBtn from '../IconBtn/IconBtn';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { Home } from '../../screens/auth/Home/Home';
// import { Footer } from '../Footer/Footer';
// import { SignIn } from '../../screens/auth/SignIn/SignIn';
// import { SignUp } from '../../screens/auth/SignUp/SignUp';
// import { ResetPassword } from '../../screens/auth/ResetPassword/ResetPassword';
// import { Terms } from '../../screens/auth/Terms/Terms';




export const Drawer = () => {
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('navLinks activeMenu');
    let [handleContent, setHandleContent] = useState('rightSide contractContent');
    let [activeScreen, setActiveScreen] = useState('Home');

    const navigate = useNavigate();

    const btns = [
        {
            label: 'Home',
            icon: (color) => <HomeIcon sx={{ color: color }} />,
            to: '/'
        },
        {
            label: 'Packages',
            icon: (color) => <LocalOfferIcon sx={{ color: color }} />,
            to: '/'
        },
        {
            label: 'Affliate',
            icon: (color) => <PeopleAltIcon sx={{ color: color }} />,
            to: '/'
        },
        {
            label: 'FAQ',
            icon: (color) => <QuizIcon sx={{ color: color }} />,
            to: '/'
        },
        {
            label: 'About Us',
            icon: (color) => <InfoIcon sx={{ color: color }} />,
            to: '/'
        },
    ]

    const handleBtnClick = (e) => {
        setActiveScreen(e.label);
        navigate(e.to)
        if (deviceType === 'Mobile') {
            setMenu(!menu)
        }
    }

    useEffect(() => {
        menu ? setActiveMenu('navLinks') : setActiveMenu("navLinks activeMenu");
        menu ? setHandleContent('rightSide') : setHandleContent('rightSide contractContent')
    }, [menu])


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('Mobile');
                setMenu(true)
            } else if (width >= 768 && width < 1024) {
                setDeviceType('Tablet');
            } else {
                setDeviceType('Laptop/Desktop');
            }
        };

        // Initial check on component mount
        handleResize();

        // Add event listener to check on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        navigate('/Home')
    }, [])

    return (
        <div>
            Hello
            <div className="top">
                <div className="leftBox">
                    <div className="menuIcon" onClick={() => {
                        setMenu(!menu)
                    }}>
                        <MenuIcon sx={{ fontSize: '22px' }} />
                    </div>
                    <img src={Logo} className='logo' />
                </div>
                {/* <div className='btnsBox'>
                    <Btn
                        label='Sign In'
                        onClick={() => {
                            setActiveScreen('SignIn')
                            navigate('/SignIn')
                        }}
                        bgColor={Colors.secondary_bg}
                    />
                    {deviceType !== "Mobile" && <Btn
                        label='Sign Up'
                        onClick={() => {
                            setActiveScreen('/SignUp')
                            navigate('/SignUp')
                        }}
                        bgColor="#ffc10769"
                        className='signUpBtn'
                    />}
                </div> */}

            </div>
            <div className='main'>
                <div className={activeMenu}>
                    {
                        btns.map((e, i) => {
                            return (
                                <div key={i}>{e.label}</div>
                                // <IconBtn
                                //     key={i}
                                //     label={e.label}
                                //     fullWidth={true}
                                //     bgColor={activeScreen === e.label ? Colors.secondary_bg : Colors.primary_bg}
                                //     color={activeScreen === e.label ? Colors.accent_text : Colors.primary_text}
                                //     icon={e.icon}
                                //     onClick={() => handleBtnClick(e)}
                                // />
                            )
                        })
                    }

                </div>
                {/* Main Content of Screeens  */}
                <div className={handleContent} >
                    <Routes>
                        {/* <Route path='Home' element={<Home />}></Route>
                        <Route path='SignIn' element={<SignIn />}></Route>
                        <Route path='SignUp' element={<SignUp />}></Route>
                        <Route path='ResetPassword' element={<ResetPassword />}></Route>
                        <Route path='Terms' element={<Terms />}></Route> */}
                    </Routes>
                </div>

            </div>
        </div>
    )
}