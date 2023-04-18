import React from 'react';
import Select from 'react-select'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function SelectCustom() {
    return (
        <Select
            options={options}
        />
    )
}
