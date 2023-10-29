import React from 'react'
import './Btn.css'

export default function Btn({ label, onClick, className, style }) {
    return (
        <button onClick={onClick} className={className ?? 'button'} style={style} >{label}</button>
    )
}
