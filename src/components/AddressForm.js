import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import {
    Box,
    TextField,
    Grid,
    InputBase,
    Autocomplete
} from '@mui/material';
import {useFormContext} from 'react-hook-form';

import 'react-phone-number-input/style.css'

const CustomBox = styled(Box)`
margin-top:20px;
`

const CustomGridContainer = styled(Grid)`
margin:20px 0px;
`

const CustomGrid = styled.label`

`

function AddressForm() {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState("")
    const previousController = useRef();
    const {
        register,
        formState: {
            errors
        },
        trigger,
        control,
        watch,
        setValue,
        getValues
    } = useFormContext(); // retrieve all hook methods


    const getData = (searchTerm) => {
        if (previousController.current) {
            previousController.current.abort();
        }
        const controller = new AbortController();
        const signal = controller.signal;
        previousController.current = controller;
        fetch("https://api.locationiq.com/v1/autocomplete?key=pk.0062d1bf896ea8fa9fe28a8df572d75d&q=" + searchTerm, {signal}).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            const updatedOptions = myJson.map((p) => {
                return {title: p.display_address};
            });
            setOptions(updatedOptions);
        }).catch(console.error);
    };

    const onInputChange = (event, value, reason) => {
        if (value) {
            console.log(value);
            getData(value);
        } else {
            setOptions([]);
        }
    };


    return (
        <CustomBox>
            <CustomGridContainer container>
                <Grid item xs={2}>
                    <label for>Address Line 1</label>
                </Grid>
                <Grid item
                    xs={2}>
                    <Autocomplete id="combo-box-demo"
                    freeSolo
                        options={options}
                        onInputChange={onInputChange}
                        getOptionLabel={
                            (option) => option.title
                        }
                        // inputValue={selectedValue}
                        style={
                            {width: 300}
                        }
                        renderInput={
                            (params) => (
                                <TextField {...params} label="Address Line 1" variant="outlined"/>
                            )
                        }
                        onChange={
                            (event, value) => {
                                if (value && value.title) {
                                    setValue("address1", value.title)
                                }

                            }
                        }/>
                </Grid>

    </CustomGridContainer>
    <CustomGridContainer container>
        <Grid item xs={2}>
            <label for>Address Line 2 : Unit or Floor</label>
        </Grid>
        <Grid item xs={2}>
            <input type="address2" id="standard-basic" variant="standard" label="Address Line 2" {...register("address2",{required:"Address Line 2 is Required",})}/> 
        </Grid>
        <Grid item xs={2}>
            {errors.address2 && errors.address2.message}    
        </Grid>

    </CustomGridContainer>
    <CustomGridContainer container>
        <Grid item xs={2}>
            <label for>City</label>
        </Grid>
        <Grid item xs={2}>
            <input type="city" id="standard-basic" variant="standard" label="Address Line 2" {...register("city",{required:"city is Required"})}/>
        </Grid>
        <Grid item xs={2}>
            {errors.city && errors.city.message}
        </Grid> 
    </CustomGridContainer>
    <CustomGridContainer container>
        <Grid item xs={2}>
            <label for>State</label>
        </Grid>
        <Grid item xs={2}>
            <input type="state" id="standard-basic" variant="standard" label="State" {...register("state",{required:"state is Required"})}/>
        </Grid>
        <Grid item xs={2}>
            {errors.state && errors.state.message}
        </Grid>
    </CustomGridContainer>
    <CustomGridContainer container>
        <Grid item xs={2}>
            <label for>Country</label>
        </Grid>
        <Grid item xs={2}>
            <input type="state" id="standard-basic" variant="standard" label="Country" {...register("country",{required:"country is Required"})}/>
        </Grid>
        <Grid item xs={2}>
            {errors.country && errors.country.message}
        </Grid>
    </CustomGridContainer>
        <CustomGridContainer container>
            <Grid item xs={2}>
                <label for>Postal Code</label>
            </Grid>
            <Grid item xs={2}>
                <input type="state" id="standard-basic" variant="standard" label="Postal" {...register("postal",{required:"Postal Code is Required"})}/>
            </Grid>
            <Grid item xs={2}>
                {errors.postal && errors.postal.message}
            </Grid>
        </CustomGridContainer>
  </CustomBox>
    )
}

export default AddressForm
