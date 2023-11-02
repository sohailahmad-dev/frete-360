import { Grid, Modal } from '@mui/material'
import './WishlistModal.css'
import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Btn from '../../../components/btn/Btn';

export default function WishlistModal({ open, onClose }) {


    return (
        <div>
            <Modal open={open}>
                <div className='wishlist-modal-style' >
                    <div className='wishlist-modal-content'>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className="wishlist-modal-header">
                                    <div className="wishlist-modal-heading">
                                        Detalhes do pedido
                                        <div onClick={onClose}>
                                            <CancelIcon sx={{ fontSize: 40 }} />
                                        </div>
                                    </div>
                                    <div className="wishlist-modal-id">
                                        <div>#23435</div>
                                        15/06/2023
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="wishlist-modal-body">
                                    <div className="wishlist-modal-subHeading">Dados:</div>
                                    <div>
                                        <div className="wishlist-text-heading">Nome:</div>
                                        <div className="wishlist-text-content">Beltrano da silva</div>
                                    </div>
                                    <div>
                                        <div className="wishlist-text-heading">E-mail:</div>
                                        <div className="wishlist-text-content">Beltranodasilva@gmail.com</div>
                                    </div>
                                    <div>
                                        <div className="wishlist-text-heading">Telefone:</div>
                                        <div className="wishlist-text-content">46 99234-2349</div>
                                    </div>
                                    <Btn
                                        icon={<WhatsAppIcon />}
                                        label={'Voltar ao inicio'}
                                        onClick={() => { }}
                                        style={{ width: "100%", height: "45px", background: '#029711', margin: '35px 0px' }}
                                    />
                                    <div className="wishlist-modal-subHeading">Dados da mudança:</div>
                                    <div>
                                        <div className="wishlist-text-heading1">Origem:</div>
                                        <div className="wishlist-text-content">Rio de janeiro / RJ</div>
                                    </div>
                                    <div>
                                        <div className="wishlist-text-heading1">Destino:</div>
                                        <div className="wishlist-text-content">Juazeiro / BA</div>
                                    </div>
                                    <div>
                                        <div className="wishlist-text-heading1">Data da mudança:</div>
                                        <div className="wishlist-text-content">22/02/2024</div>
                                    </div>
                                    <div className="wishlist-text-heading1">Descrição:</div>
                                    <div className="wishlist-text-content1">Lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit,</div>

                                </div>

                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="wishlist-modal-body">
                                    <div className="wishlist-text-heading1">Descrição:</div>
                                    <div className="wishlist-text-content1">Lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit, lorem ipsum dolor sit,</div>
                                    <div className="wishlist-text-heading1" style={{ marginTop: '25px' }}>
                                        Listagem:
                                    </div>
                                    <div >
                                        <div className="wishlist-text-heading" style={{ fontWeight: 'bold' }}>Item</div>
                                        <div className="wishlist-text-content" style={{ fontWeight: 'bold' }}>Quantitade</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item'>
                                        <div className="wishlist-text-heading">Cadeira</div>
                                        <div className="wishlist-text-content">12</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item'>
                                        <div className="wishlist-text-heading">Sofa</div>
                                        <div className="wishlist-text-content">02</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item'>
                                        <div className="wishlist-text-heading">Estantes</div>
                                        <div className="wishlist-text-content">08</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item'>
                                        <div className="wishlist-text-heading">Mesas</div>
                                        <div className="wishlist-text-content">22</div>
                                    </div>
                                    <br />
                                    <div className='wishlist-modal-underline-item2'>
                                        <div className="wishlist-text-heading2">Horário preferencial para a mudança:</div>
                                        <div className="wishlist-text-content2">Não</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item2'>
                                        <div className="wishlist-text-heading2">Necessidade de montagem/desmonstagem:</div>
                                        <div className="wishlist-text-content2">Não</div>
                                    </div>
                                    <div className='wishlist-modal-underline-item2'>
                                        <div className="wishlist-text-heading2">Restrição ou taxa de trânsito:</div>
                                        <div className="wishlist-text-content2">Sim - R$15</div>
                                    </div>

                                </div>

                            </Grid>
                        </Grid>

                    </div>
                </div></Modal>
        </div>
    )
}
