'use client';

import { useState, useEffect, useRef } from 'react';

type DropdownProps = {
  options: string[];
  defaultOption: string;
  onSelect: (option: string) => void;
};

export default function Dropdown({ options, defaultOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex items-center justify-between px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-auto'
      >
        <span>{selectedOption || 'Select an option'}</span>
        <span className='ml-2'>
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 15l7-7 7 7'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <ul className='absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-28 overflow-y-auto z-50'>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}