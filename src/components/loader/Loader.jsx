import { CircularProgress, Dialog } from '@mui/material'
import React from 'react'
import './Loader.css'

export default function Loader({ isLoading }) {
    return (
        <Dialog open={isLoading} >
            <div className='loaderStyling'>
                <CircularProgress />
            </div>
        </Dialog>
    )
}
