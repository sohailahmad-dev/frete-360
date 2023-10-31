import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import Wishlist from '../screens/wishlist/Wishlist';





export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/wishlist' element={<Wishlist />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}