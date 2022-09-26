import React from 'react'
import {useFormContext} from 'react-hook-form';
function Details() {

    const {getValues} = useFormContext(); // re

    const data = getValues();

    return (
        <div>{
            Object.keys(data).map((k) => {
                return (
                    <div>{k}: {
                        data[k]
                    }</div>
                )
            })
        }</div>
    )
}

export default Details
