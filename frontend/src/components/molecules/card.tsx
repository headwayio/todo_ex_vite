import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  horizontalStack?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const Card = ({
  children,
  loading,
  disabled,
  horizontalStack,
  ...rest
}: PropsWithChildren<Props>) => {
  if (loading)
    return (
      <div
        className='flex flex-col p-4 border border-gray-200 rounded-lg animate-pulse'
        {...rest}
      >
        <div className='flex items-center justify-between'>
          <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36' />
          <svg
            className='text-gray-200 w-10 h-10 dark:text-gray-700'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <hr className='my-4' />
        <div className='h-2 my-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
        <div className='h-2 my-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
        <div className='h-2 my-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
      </div>
    );

  return (
    <div
      className={`flex ${
        horizontalStack ? 'items-center' : 'flex-col'
      } p-4 border border-gray-200 rounded-lg gap-4 ${
        disabled && 'line-through bg-gray-100 text-gray-400'
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};
