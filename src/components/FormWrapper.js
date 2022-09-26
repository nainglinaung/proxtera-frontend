import React from 'react'
import BasicUserDetails from './BasicUserDetails';
import AddressForm from './AddressForm';

import Details from './Details';

// const defaultValues = {
//   name: '',
//   address1:'',
//   email:'',
//   phone: '',
//   address2: '',
//   state: '',
//   country: '',
//   postal: '',
// }



function FormWrapper({activeStep}) {
  let obj = {};

  // const { watch, errors } = methods;


   return (

      <>
      {(activeStep == 0) && <BasicUserDetails />}
      {(activeStep == 1) && <AddressForm />}
      {(activeStep == 2) && <Details />}
</>

  )
}

export default FormWrapper