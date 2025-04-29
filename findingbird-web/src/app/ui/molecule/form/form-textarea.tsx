import { FormContext } from "./form.context";
import { useContext } from "react";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  label?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  maxLength?: number;
}

export function FormTextArea({
  label,
  id,
  placeholder,
  required = false,
  className,
  value,
  onValueChange,
  maxLength,
}: FormTextAreaProps) {
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <div className="group">
      {label ? (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium group-has-[:required]:after:pl-1 group-has-[:required]:after:text-red-400 group-has-[:required]:after:content-['*']"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        required={required}
        disabled={pending}
        maxLength={maxLength}
        className={`w-full rounded-lg border ${
          errors[id] ? "border-red-400" : "border-gray-300"
        } p-3 resize-none ring-gray-200 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
      />
      {errors[id] && (
        <p className="text-etc-red mt-1 text-sm">{errors[id].join(", ")}</p>
      )}
    </div>
  );
}
