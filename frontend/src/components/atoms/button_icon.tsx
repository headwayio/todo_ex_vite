import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

export const ButtonIcon = ({ children, ...rest }: Props) => {
  return (
    <button className='p-2 hover:bg-gray-100 rounded-full transition' {...rest}>
      {children}
    </button>
  );
};
