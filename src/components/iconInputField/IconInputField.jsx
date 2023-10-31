import React, { useState } from 'react'
import './IconInputField.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import searchIcon from '../../assets/imgs/searchIcon.png'

export default function IconInputField({ placeholder, onChange, value }) {




    return (
        <div className='inputBox1' >
            <div className='leftBox1' >
                <img className='iconMain1' src={searchIcon} />

                <input onChange={onChange} className='input1' value={value} placeholder={placeholder} />
            </div>

            <div className='iconMain1' ><KeyboardArrowDownIcon /></div>
        </div>
    )
}

// https://sale-push-website.vercel.app/stats