import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function Snack({ open, msg, onClose, time, severity }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open} autoHideDuration={time ?? 6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity ?? "error"} sx={{ width: '100%', boxShadow: '5px 10px 20px rgba(0,0,0,0.1)' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}
