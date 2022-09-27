import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormWrapper from '../components/FormWrapper';
import { useForm, FormProvider  } from "react-hook-form";

const steps = ['Basic User Information', 'Country and Address', 'Details'];



export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const methods = useForm({ mode: "all" });

  let { formState: { errors },watch }= methods;
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const onSubmit = (data) => {
    fetch("https://webhook.site/c5c76877-e804-4b4d-b9eb-fdb2c8077ad9",{method:"POST",mode:"cors", headers: {
      'Access-Control-Allow-Origin':'*'
    }}).then(function (response) {
      return response.json();
  }).then(function (myJson) {
      console.log(myJson)
  });
    // console.log("final data",data)
  }
  

  // React.useEffect(() => {
  //   console.log(errors)
  // }, [errors])
  

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    methods.trigger().then((validateSuccess) => {
 
      if (validateSuccess) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    })
   
    
   
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <FormProvider  {...methods}>
   <form onSubmit={methods.handleSubmit(onSubmit)}>

    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps  = {};
          const labelProps  = {};
        
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <React.Fragment>

          <FormWrapper activeStep={activeStep} />

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            
            {activeStep === steps.length - 1 ? <Button type="submit">Finish</Button> : <Button onClick={handleNext}>Next </Button>}
          
          </Box>
        </React.Fragment>
      )}
    </Box>
    </form>
   
    </FormProvider>

  );
}
