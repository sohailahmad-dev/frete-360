import React, { useState } from 'react'
import './InputField.css'
import hideIcon from '../../assets/img/hideIcon.png'

export default function InputField({ icon, placeholder, isPassword, onChange, value }) {


    return (
        <div className='inputBox' >


            <input onChange={onChange} value={value} placeholder={placeholder} />

        </div>
    )
}

// https://sale-push-website.vercel.app/stats
