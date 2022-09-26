import React from 'react'
import {Box, TextField, Grid, InputBase} from '@mui/material';
import {useFormContext, Controller} from 'react-hook-form';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

import 'react-phone-number-input/style.css'


const isValidEmail = email => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);function BasicUserDetails({name, phone, email}) {
const {register, formState: {
        errors
    }, trigger, control} = useFormContext();


return (
    <Box>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>Name</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="text" id="standard-basic" variant="standard" label="Name" {...register("name",{required:true, required:"Name is required"})}/>
                <p>{
                    errors.name && errors.name.message
                }</p>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>Phone</label>
            </Grid>
            <Grid item
                xs={2}>
                <Controller name="phone-input"
                    control={control}
                    rules={
                        {
                            required: true,
                            validate: (value) => isValidPhoneNumber(value)
                        }
                    }
                    render={
                        ({
                            field: {
                                onChange,
                                value
                            }
                        }) => (
                            <PhoneInput value={value}
                                onChange={onChange}
                                defaultCountry="TH"
                                id="phone-input"/>
                        )
                    }/> {
                errors["phone-input"] && (
                    <p className="error-message">Invalid Phone</p>
                )
            } </Grid>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>Email</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="email" id="standard-basic" variant="standard" label="Email" {...register("email",{
                                                      required:"Email is Required",
                                                      pattern: {
                                                        value:
                                                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Email must be valid",
                                                      },  
                                                    })}/>
                <p>{
                    errors.email && errors.email.message
                }</p>
            </Grid>
        </Grid>
    </Box>
)}export default BasicUserDetails
