import React, { useState } from 'react'
import './FormHome.css'
import SelectBox from '../../../components/selectBox/SelectBox'
import { Box, FormControl, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Btn from '../../../components/btn/Btn'
import CheckBox from '../../../components/checkBox/CheckBox';
import InputField from '../../../components/inputField/InputField';
import photo from '../../../assets/imgs/photo.png'

export default function FormHome() {
    let [dataObj, setDataObj] = useState({})
    let [isStep1Error, setIsStep1Error] = useState(false)
    let [isStep2Error, setIsStep2Error] = useState(false)
    let [isStep3Error, setIsStep3Error] = useState(false)
    let [isStep4Error, setIsStep4Error] = useState(false)
    let [currentStep, setCurrentStep] = useState(1)
    const options = ['1st', '2nd', '3rd'];


    const addValue = (key, value) => {
        dataObj[key] = value.toString();
        setDataObj({ ...dataObj })
        console.log(dataObj)
    }

    const moveToStep2 = () => {
        const { originState, originCity, originHouseOrApartment, destinationState, destinationCity, destinationHouseOrApartment, dateOfChange } = dataObj
        if (originState && originCity && originHouseOrApartment && destinationState && destinationCity && destinationHouseOrApartment && dateOfChange) {
            setCurrentStep(2)
            setIsStep1Error(false)
        } else {
            setIsStep1Error(true)
        }
    }

    const moveToStep3 = () => {
        const { preferedTimeForMoving, restrictionOrFees, needMovingCompany, disassembleOrAssemble, isDateFlexible } = dataObj

        if (preferedTimeForMoving && restrictionOrFees && needMovingCompany && disassembleOrAssemble && isDateFlexible) {
            setCurrentStep(3)
            setIsStep2Error(false)
        }
        else {
            setIsStep2Error(true)
        }
    }

    const moveToStep4 = () => {
        setCurrentStep(4)
    }



    const moveBackStep1 = () => {
        setCurrentStep(1)
    }

    const moveBackStep2 = () => {
        setCurrentStep(2)
    }
    return (
        <div className='home-form-parent'>
            <div className="home-form-navigator">
                <div className='home-form-navigator-line' />
                <div className="home-form-circles">
                    <div className="home-form-circle">1</div>
                    <div className="home-form-circle">2</div>
                    <div className="home-form-circle">3</div>
                    <div className="home-form-circle">4</div>
                </div>
            </div>
            <div className='home-form'>
                {/* Step 1  */}
                {currentStep === 1 && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="form-heading">Qual origem da mudança?</div>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectBox
                            label='Estado'
                            options={options}
                            onChange={(val) => addValue('originState', val)} />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectBox
                            label='Cidade'
                            options={options}
                            onChange={(val) => addValue('originCity', val)} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectBox
                            label='Casa ou Apartamento'
                            options={options}
                            onChange={(val) => addValue('originHouseOrApartment', val)} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="form-heading">Qual destino da mudança?</div>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectBox
                            label='Estado'
                            options={options}
                            onChange={(val) => addValue('destinationState', val)} />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectBox
                            label='Cidade'
                            options={options}
                            onChange={(val) => addValue('destinationCity', val)} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectBox
                            label='Casa ou Apartamento'
                            options={options}
                            onChange={(val) => addValue('destinationHouseOrApartment', val)} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="form-heading">Qual a data da mudança?</div>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="dd/mm/aa"
                                    onChange={(val) => addValue('dateOfChange', val?.$d)}
                                    sx={{ width: '100%', background: 'white', border: '1px solid gray' }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        {isStep1Error && <div className='form-error-msg'>
                            Campos obrigatórios estão faltando
                        </div>}
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Btn
                                label='Próximo'
                                onClick={moveToStep2}
                                style={{ width: '100%', height: '45px', margin: "15px 0px" }} />
                        </div>
                    </Grid>
                </Grid>}
                {/* Step 2  */}
                {currentStep === 2 && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="form-heading">Informações adicionais:</div>
                        <CheckBox
                            defaultValue={dataObj?.preferedTimeForMoving}
                            onChange={(val) => addValue('preferedTimeForMoving', val)}
                            label='Existe algum horário preferencial para a mudança?' showQual={true} />
                        <CheckBox
                            defaultValue={dataObj?.restrictionOrFees}
                            onChange={(val) => addValue('restrictionOrFees', val)}
                            label='Há alguma restrição ou taxa para transitar ou estacionar em frente a um dos endereços?' showQual={true} />
                        <CheckBox
                            defaultValue={dataObj?.needMovingCompany}
                            onChange={(val) => addValue('needMovingCompany', val)}
                            label='Você precisa que a empresa de mudanças embale algum item para você?' showQual={true} />
                        <CheckBox
                            defaultValue={dataObj?.disassembleOrAssemble}
                            onChange={(val) => addValue('disassembleOrAssemble', val)}
                            label='Existe necessidade de desmontagem e montagem de móveis?' />
                        <CheckBox
                            defaultValue={dataObj?.isDateFlexible}
                            onChange={(val) => addValue('isDateFlexible', val)}
                            label='A data é flexivel?' />
                    </Grid>
                    <Grid item xs={12}>
                        {isStep2Error && <div className='form-error-msg'>
                            Campos obrigatórios estão faltando
                        </div>}
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: "15px" }}>
                            <Btn
                                label='Voltar'
                                onClick={moveBackStep1}
                                style={{ width: '100%', height: '45px', background: 'white', border: '2px solid #0026AB', color: '#0026AB' }} />
                            <Btn
                                label='Próximo'
                                onClick={moveToStep3}
                                style={{ width: '100%', height: '45px' }} />
                        </div>
                    </Grid>
                </Grid>}
                {/* Step 3  */}
                {currentStep === 3 && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="form-heading">Use o espaço para descrever com detalhes os itens da sua mudança</div>
                        <textarea onChange={(e) => console.log(e.target.value)} className='textArea-form' placeholder='Quanto mais detalhada a descrição, mais as empresas conseguirão manda um orçamento adequado.' ></textarea>
                        <div className="form-heading1">Se preferir adicione os itens</div>
                        <div className='form-add-field'>
                            <InputField placeholder='Descrição:' />
                            <InputField placeholder='Quantidade:' />
                            <Btn
                                label='+'
                                onClick={() => { }}
                                style={{ height: '40px', background: '#00A907', padding: '0px 20px' }}
                            />
                        </div>

                    </Grid>

                    <Grid item xs={12}>
                        {isStep3Error && <div className='form-error-msg'>
                            Campos obrigatórios estão faltando
                        </div>}
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: "15px" }}>
                            <Btn
                                label='Voltar'
                                onClick={moveBackStep2}
                                style={{ width: '100%', height: '45px', background: 'white', border: '2px solid #0026AB', color: '#0026AB' }} />
                            <Btn
                                label='Próximo'
                                onClick={moveToStep4}
                                style={{ width: '100%', height: '45px' }} />
                        </div>
                    </Grid>
                </Grid>}
                {/* Step 4  */}
                {currentStep === 4 && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="form-heading" >Informe seus dados para contato:</div>
                        </div>
                        <InputField placeholder='Nome:' />
                        <InputField placeholder='E-mail:' />
                        <InputField placeholder='Telefone:' />
                        <div className='upload-photo-box'>
                            <img src={photo} alt="photo" className='upload-photo' />
                            <div className='upload-photo-innerBox'>
                                <div className='upload-photo-text'>Adicione uma foto do seu rosto</div>
                                <div className='upload-photo-text1'>A foto será usada apenas para fins de validação</div>
                            </div>
                        </div>


                    </Grid>

                    <Grid item xs={12}>
                        {isStep4Error && <div className='form-error-msg'>
                            Campos obrigatórios estão faltando
                        </div>}
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: "15px" }}>
                            <Btn
                                label='Voltar'
                                onClick={moveBackStep2}
                                style={{ width: '100%', height: '45px', background: 'white', border: '2px solid #0026AB', color: '#0026AB' }} />
                            <Btn
                                label='Próximo'
                                onClick={moveToStep4}
                                style={{ width: '100%', height: '45px' }} />
                        </div>
                    </Grid>
                </Grid>}

            </div>
        </div>

    )
}
