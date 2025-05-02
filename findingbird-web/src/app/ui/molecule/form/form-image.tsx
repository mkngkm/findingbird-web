import { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface FormImageProps {
  label?: string;
  id: string;
  required?: boolean;
  value: File | null;
  className?: string;
  onImageChange?: (file: File | null) => void;
}

export function FormImage({
  label,
  id,
  required,
  value,
  className,
  onImageChange,
}: FormImageProps) {
  const [file, setFile] = useState<File | null>(value);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (onImageChange) {
      onImageChange(selectedFile);
      console.log(value);
    }
  };

  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className={`group ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <label htmlFor={id} className="flex flex-col items-center cursor-pointer">
        <MdOutlineAddPhotoAlternate size={40} color="gray" />
        <span className="text-gray-500 text-sm">
          사진을 추가해주세요(최대 1장)
        </span>
        <input
          type="file"
          accept="image/*"
          id={id}
          className="hidden"
          required={required}
          onChange={handleImageChange}
        />
      </label>
      {file && previewUrl && (
        <img
          alt="Preview"
          className="mt-2 w-40 h-40 object-cover"
          src={previewUrl}
        />
      )}
    </div>
  );
}
