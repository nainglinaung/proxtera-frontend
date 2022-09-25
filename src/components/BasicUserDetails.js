import React from 'react'
import { Box,TextField,Grid,InputBase } from '@mui/material';
import { useForm } from 'react-hook-form';


function BasicUserDetails({control}) {
  console.log(control)
  return (
    <Box>
            <Grid container>
              <Grid item xs={2}> 
                <label htmlFor="type">Make *</label>
                {/* <TextField id="standard-basic" label="Name" variant="standard" />  */}
              </Grid>
              <Grid item xs={2}></Grid>
              {/* <Grid item xs={2}><TextField id="standard-basic" label="Phone" variant="standard" /> </Grid>
              <Grid item xs={2}><TextField id="standard-basic" label="Email" variant="standard" /> </Grid> */}
            </Grid>
        </Box>
  )
}

export default BasicUserDetails