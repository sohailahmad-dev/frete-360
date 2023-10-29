import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export default function SelectBox({ options, onChange, label }) {
    let [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value)
    };

    return (
        <Box sx={{ width: '100%', margin: '0px' }}>
            <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">{label ?? "Select"}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Select"
                    sx={{ background: 'white', border: '1px solid gray' }}
                    onChange={handleChange}
                >
                    {options && options.length > 0 &&
                        options.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
