import React, { useEffect, useState } from 'react'
import './CheckBox.css'

export default function CheckBox({ label, onChange, showQual, defaulValue }) {

    let [selected, setSelected] = useState('');

    const select = (val) => {
        setSelected(val)
        onChange(val)
    }

    useEffect(() => {
        setSelected(defaulValue)
    }, [])

    return (
        <div className='main-checkBox'>
            <div className='checkBox-text' >{label ?? 'label'}</div>
            <div className='checkBox-1'>
                <div className='checkBox-2'>
                    <div className='checkBox-3'>
                        <div onClick={() => select(true)} className='checkBox-box'>
                            {selected === true && <div className='checkBox-selected' />}
                        </div>
                        <div>Sim</div>
                    </div>
                    <div className='checkBox-3'>
                        <div onClick={() => select(false)} className='checkBox-box' >
                            {selected === false && <div className='checkBox-selected' />}
                        </div>
                        <div>Não</div>
                    </div>
                </div>
                {showQual && <div className='checkBox-qual'>Qual:</div>}
            </div>
        </div>
    )
}
