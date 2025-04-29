'use client'

import { cn } from "@/app/utils/style/helper";
import { JSX, useEffect, useState } from "react";
import Switch from "./switch";

type TextToggleButtonProps = {
  text: string;  // "기록/도감" 이런 식
  disabled?: boolean;
  onToggle?: (active: boolean) => void;
};

export default function TextToggleButton({ text, disabled = false, onToggle }: TextToggleButtonProps): JSX.Element {
  const [active, setActive] = useState(false);

  useEffect(() => {
    onToggle?.(active);
  }, [active, onToggle]);

  const handleToggleChange = (state: boolean) => {
    setActive(state);
  };

  const [firstText, secondText] = text.split('/');

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-full">
      {/* 첫 번째 버튼 */}
      <div
        className={cn(
          "flex-1 text-center text-sm px-4 py-1 rounded-full cursor-pointer transition-all",
          !active ? "bg-green-400 text-white" : "text-gray-400"
        )}
        onClick={() => handleToggleChange(false)}
      >
        {firstText}
      </div>

      {/* 두 번째 버튼 */}
      <div
        className={cn(
          "flex-1 text-center text-sm px-4 py-1 rounded-full cursor-pointer transition-all",
          active ? "bg-green-400 text-white" : "text-gray-400"
        )}
        onClick={() => handleToggleChange(true)}
      >
        {secondText}
      </div>
    </div>
  );
}
