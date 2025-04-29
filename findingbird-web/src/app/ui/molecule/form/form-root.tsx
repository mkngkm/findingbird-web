"use client";
// import { filterChildrenByType } from "@/app/utils/helper";
import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { FormSubmitButton } from "./form-submit-button";
import { FormContext } from "./form.context";
import Callout from "../callout/callout";

export interface FormState {
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  validationError: Record<string, string[] | undefined>;
}

interface FormRootProps {
  id: string;
  onSuccess?: () => void;
  onSubmit?: () => void;
  action: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState> | FormState;
  failMessageControl: "alert";
}

export function FormRoot({
  id,
  action,
  onSubmit,
  onSuccess,
  failMessageControl = "alert",
  children,
}: React.PropsWithChildren<FormRootProps>) {
  const initialState: FormState = {
    isSuccess: false,
    isFailure: false,
    message: null,
    validationError: {},
  };
  const [formState, dispatch] = useFormState(action, initialState);

  useEffect(() => {
    if (formState.isSuccess) {
      onSuccess?.();
    }
  }, [formState]);

  const renderWithoutSubmitButton = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child) || child.type === FormSubmitButton)
        return null;
      if (child.type === FormSubmitButton) return child;
      return <div key={index}>{child}</div>;
    });
  };

  return (
    <FormContext.Provider
      value={{ errors: formState.validationError, formId: id }}
    >
      {formState.isFailure && failMessageControl === "alert" ? (
        <div className="mb-4">
          <Callout variant={"destructive"} content={formState.message!} />
        </div>
      ) : null}
      <form id={id} action={dispatch} onSubmit={onSubmit}>
        {renderWithoutSubmitButton()}
      </form>
    </FormContext.Provider>
  );
}
