import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

export const ButtonIcon = ({ children, ...rest }: Props) => {
  return (
    <button
      className='relative p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 focus:bg-gray-100 dark:focus:bg-zinc-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 rounded-full transition'
      {...rest}
    >
      {children}
    </button>
  );
};
