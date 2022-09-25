import React from 'react'
import BasicUserDetails from './BasicUserDetails';
import AddressForm from './AddressForm';
import Details from './Details';
import { useForm } from 'react-hook-form';
const defaultValues = {
  name: '',
  address1:'',
  email:'',
  phone: '',
  address2: '',
  state: '',
  country: '',
  postal: '',
}

const onFormSubmit = (e) => {
  console.log(e)
}


function FormWrapper({activeStep}) {

  const { handleSubmit, control, formState: { errors }, register, setError, clearErrors,reset, watch, getValues, setValue } = useForm({defaultValues });
   
  return <form onSubmit={handleSubmit(onFormSubmit)}>
    {(activeStep == 0) && <BasicUserDetails {...control} />}
    {(activeStep == 1) && <AddressForm />}
    {(activeStep == 2) && <Details />}
  </form>
 
}

export default FormWrapper

{/* <Controller
                        control={control}
                        name="type"
                        rules={{required: true}}
                        render={({ field }) =>(
                            <Select
                                classes={{ icon: classes.icon, iconOpen: classes.iconOpen}}
                                className={classes.select}
                                id="type"
                                input={<BootstrapInput />}
                                MenuProps={MenuProps}
                                IconComponent={ExpandMoreIcon}
                                {...field}
                                onChange={(e)=>{
                                    field.onChange(e);
                                    props.onchange(true)
                                }}
                            >   
                                {bikeMakeList.map((make, key) => 
                                    <MenuItem value={make} key={key}>
                                        {make}
                                    </MenuItem>
                                )}
                            </Select>
                        )} */}