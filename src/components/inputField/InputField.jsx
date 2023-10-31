import React, { useState } from 'react'
import './InputField.css'

export default function InputField({ placeholder, onChange, value, style }) {


    return (
        <div className='inputBox' style={style} >

            <input onChange={onChange} value={value} placeholder={placeholder} />

        </div>
    )
}

// https://sale-push-website.vercel.app/stats
