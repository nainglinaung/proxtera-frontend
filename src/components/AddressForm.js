import React, {useState, useEffect, useRef} from 'react'
import {
    Box,
    TextField,
    Grid,
    InputBase,
    Autocomplete
} from '@mui/material';
import {useFormContext} from 'react-hook-form';

import 'react-phone-number-input/style.css'


function AddressForm() {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null)
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

    watch()
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
        });
    };

    const onInputChange = (event, value, reason) => {
        if (value) {
            getData(value);
        } else {
            setOptions([]);
        }
    };


    return (
        <Box>
            <Grid container>
                <Grid item
                    xs={2}>
                    <label for>Address Line 1</label>
                </Grid>
                <Grid item
                    xs={2}>
                    <Autocomplete id="combo-box-demo"
                        options={options}
                        onInputChange={onInputChange}
                        getOptionLabel={
                            (option) => option.title
                        }
                        inputValue={selectedValue}
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
                                setValue("address1", value.title)
                            }
                        }/>
                </Grid>

    </Grid>
    <Grid container>
        <Grid item
            xs={2}>
            <label for>Address Line 2 : Unit or Floor</label>
        </Grid>
        <Grid item
            xs={2}>
            <input type="address2" id="standard-basic" variant="standard" label="Address Line 2" {...register("address2",{required:"Address Line 2 is Required",})}/>
            <p>{
                errors.address2 && errors.address2.message
            }</p>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>City</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="city" id="standard-basic" variant="standard" label="Address Line 2" {...register("city",{required:"city is Required"})}/>
                <p>{
                    errors.city && errors.city.message
                }</p>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>State</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="state" id="standard-basic" variant="standard" label="State" {...register("state",{required:"state is Required"})}/>
                <p>{
                    errors.state && errors.state.message
                }</p>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>Country</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="state" id="standard-basic" variant="standard" label="Country" {...register("country",{required:"country is Required"})}/>
                <p>{
                    errors.country && errors.country.message
                }</p>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item
                xs={2}>
                <label for>Postal Code</label>
            </Grid>
            <Grid item
                xs={2}>
                <input type="state" id="standard-basic" variant="standard" label="Postal" {...register("postal",{required:"Postal Code is Required"})}/>
                <p>{
                    errors.postal && errors.postal.message
                }</p>
            </Grid>
        </Grid>
    </Grid>
</Box>
    )
}

export default AddressForm
