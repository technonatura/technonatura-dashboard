// material

import { LoadingButton } from "@material-ui/lab";

// eslint-disable-next-line import/no-cycle
import FormSteps from "./FormSteps";

// ----------------------------------------------------------------------

interface SubmitButtonComponentI {
  isSubmitting: boolean;
  formik: any;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  goBack: boolean;
  steps: number;
}
export default function SubmitButton({
  isSubmitting,
  formik,
  currentStep,
  nextStep,
  previousStep,
  goBack,
  steps,
}: SubmitButtonComponentI) {
  //   console.log("currentStep", currentStep);
  return (
    <LoadingButton
      fullWidth
      size="large"
      // eslint-disable-next-line no-nested-ternary
      type={!goBack ? (currentStep !== steps ? "button" : "submit") : "button"}
      variant="contained"
      loading={goBack ? false : isSubmitting}
      onClick={async () => {
        // console.log("hey");
        if (goBack) {
          previousStep();

          return;
        }
        console.log("i passed goBack!");

        if (currentStep !== FormSteps.length) {
          let isCurrentStepValid = true;

          // eslint-disable-next-line camelcase
          FormSteps[currentStep].inputs.forEach(({ input_name }) => {
            formik.setFieldTouched(input_name);
          });

          // @ts-ignore
          const validatedForm = await formik.validateForm();
          // console.log(validatedForm, FormSteps[currentStep].inputs);

          // eslint-disable-next-line camelcase
          FormSteps[currentStep].inputs.forEach(({ input_name }) => {
            // console.log(
            //   input_name,
            //   formik.errors[input_name],
            //   validatedForm[input_name],
            //   input_name
            // );
            if (
              // @ts-ignore
              validatedForm[input_name]
            ) {
              isCurrentStepValid = false;
            }
          });

          if (isCurrentStepValid) {
            nextStep();
          }
        }
      }}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {goBack
        ? "Back"
        : // eslint-disable-next-line no-nested-ternary
        currentStep === FormSteps.length - 1
        ? "Submit"
        : currentStep === FormSteps.length
        ? "Submit"
        : "Next"}
    </LoadingButton>
  );
}
