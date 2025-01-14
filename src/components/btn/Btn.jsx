import React from 'react'
import './Btn.css'

export default function Btn({ label, onClick, className, style, icon, afterIcon }) {
    return (
        <button onClick={onClick} className={className ?? 'button'} style={style} >{icon}{label}{afterIcon}</button>
    )
}
