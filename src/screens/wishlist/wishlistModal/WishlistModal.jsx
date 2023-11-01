import { Modal } from '@mui/material'
import './WishlistModal.css'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

export default function WishlistModal({ open = true, }) {
    return (
        <div>
            <Modal open={open}>
                <div className='wishlist-modal-style' >
                    <div className='wishlist-modal-content'>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <div className="wishlist-modal-header">
                                    <div className="wishlist-modal-heading">
                                        Detalhes do pedido
                                        <div>
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
                                <div className="wishlist-modal-subHeading">Dados:</div>

                            </Grid>
                        </Grid>

                    </div>
                </div></Modal>
        </div>
    )
}
