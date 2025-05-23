import { VariantProps } from "class-variance-authority";
import AchromaticButton, {
  buttonVariants,
} from "@/app/ui/atom/button/achromatic-button";
import { useContext, useEffect } from "react";
import { FormContext } from "./form.context";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  position?: "left" | "right" | "center";
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  setLoading?: (loading: boolean) => void;
}

export function FormSubmitButton({
  label,
  position = "right",
  variant = "default",
  size = "default",
  setLoading,
  ...props
}: FormSubmitButtonProps) {
  const { formId } = useContext(FormContext);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (setLoading) setLoading(pending);
  }, [pending, setLoading]);

  return (
    <div
      // conditional css
      className={clsx("flex w-full", {
        "justify-start": position === "left",
        "justify-center": position === "center",
        "justify-end": position === "right",
      })}
    >
      <AchromaticButton
        aria-label="submit-button"
        form={formId}
        size={size}
        variant={variant}
        type="submit"
        {...props}
      >
        {!pending ? (
          label
        ) : (
          <LoadingSpinner
            className="h-6 w-6 shrink-0 animate-spin"
            style={{ transition: `width 150ms` }}
          />
        )}
      </AchromaticButton>
    </div>
  );
}

const LoadingSpinner = ({ ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" />
  </svg>
);
