import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  size?: string;
}

export const Button = ({ type, text, variant, size, ...rest }: Props) => {
  const buttonClass = {
    primary:
      'border bg-blue-500 rounded-md p-2 text-white text-xs hover:bg-blue-600',
    secondary:
      'border bg-purple-500 rounded-md p-2 text-white text-xs hover:bg-purple-600',
    outline:
      'border border-green-600 rounded-md p-2 text-green-600 text-xs hover:text-white hover:bg-green-600',
  };

  return (
    <button
      type={type}
      className={`${buttonClass[variant]} ${
        size === 'full' ? 'w-full' : ''
      } transition`}
      {...rest}
    >
      {text}
    </button>
  );
};
