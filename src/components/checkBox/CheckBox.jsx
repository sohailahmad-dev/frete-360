import React, { useEffect, useState } from 'react'
import './CheckBox.css'
import InputField from '../inputField/InputField';



export default function CheckBox({ label, onChange, showQual, defaulValue, timeValue, channgeTimeHandle }) {

    let [selected, setSelected] = useState('');

    const select = (val) => {
        setSelected(val)
        onChange(val)
    }

    const handleTime = (val) => {
        onTime(val)
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
                {showQual && selected &&
                    <InputField placeholder='Insira a hora' value={timeValue} onChange={channgeTimeHandle}
                        style={{ margin: '8px' }}
                    />
                }
            </div>
        </div>
    )
}
