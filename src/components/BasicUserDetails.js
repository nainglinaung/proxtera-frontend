import React from 'react'
import {Box, TextField, Grid, InputBase} from '@mui/material';
import {useFormContext, Controller} from 'react-hook-form';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import styled from 'styled-components';
import 'react-phone-number-input/style.css'


const isValidEmail = email => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);




function BasicUserDetails({name, phone, email}) {
    const {register, formState: {errors}, trigger, control} = useFormContext();


    
  

    const CustomBox = styled(Box)`
        margin-top:20px;
    `

    const CustomGridContainer = styled(Grid)`
        margin:20px 0px;
    `

    return (
        <CustomBox>
             <CustomGridContainer container>
                <Grid item
                    xs={2}>
                    {/* <CustomLabel>Name</CustomLabel> */}
                    <label for>Image</label>
                </Grid>
                <Grid item
                    xs={2}>
                 lorem
                </Grid>
                <Grid item xs={2}>
                    {/* {errors.name && errors.name.message} */}
                </Grid>
            </CustomGridContainer>
            <CustomGridContainer container>
                <Grid item
                    xs={2}>
                    {/* <CustomLabel>Name</CustomLabel> */}
                    <label for>Name</label>
                </Grid>
                <Grid item
                    xs={2}>
                    <input type="text" id="standard-basic" variant="standard" label="Name" {...register("name",{required:true, required:"Name is required"})}/>
                </Grid>
                <Grid item xs={2}>
                    {errors.name && errors.name.message}
                </Grid>
            </CustomGridContainer>
            <CustomGridContainer container>
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
                        }/>  </Grid>
                 <Grid item xs={2}>
                 {errors["phone-input"] && "Invalid Phone"}
                </Grid>
            </CustomGridContainer>
            <CustomGridContainer container>
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
                   
                </Grid>
                <Grid item xs={2}>
                     {
                        errors.email && errors.email.message
                    }
                </Grid>
            </CustomGridContainer>
        </CustomBox>
    )}
export default BasicUserDetails
