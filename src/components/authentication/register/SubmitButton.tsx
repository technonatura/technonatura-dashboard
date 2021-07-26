// material

import { LoadingButton } from "@material-ui/lab";

// eslint-disable-next-line import/no-cycle
import { FormSteps } from "./RegisterForm";

// ----------------------------------------------------------------------

interface SubmitButtonComponentI {
  isSubmitting: boolean;
  formik: any;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  goBack: boolean;
}
export default function SubmitButton({
  isSubmitting,
  formik,
  currentStep,
  nextStep,
  previousStep,
  goBack,
}: SubmitButtonComponentI) {
  //   console.log("currentStep", currentStep);
  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      loading={goBack ? false : isSubmitting}
      onClick={async () => {
        if (goBack) {
          previousStep();
          return;
        }

        if (currentStep !== FormSteps.length) {
          let isCurrentStepValid = true;

          // @ts-ignore
          const validatedForm = await formik.validateForm();
          // console.log(validatedForm, FormSteps[currentStep].inputs);

          // eslint-disable-next-line camelcase
          FormSteps[currentStep].inputs.forEach(({ input_name }) => {
            if (
              // @ts-ignore
              validatedForm[input_name]
            ) {
              isCurrentStepValid = false;
            }
          });
          console.log("currentStep", currentStep);
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
