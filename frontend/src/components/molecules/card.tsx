import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { Loading } from './loading';

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
  return (
    <div
      className={`flex ${
        horizontalStack ? 'items-center' : 'flex-col'
      } p-4 border border-gray-200 rounded-lg gap-4 ${
        disabled &&
        'line-through bg-gray-100 border-gray-100 dark:bg-zinc-700 text-gray-500 dark:border-zinc-700'
      }`}
      {...rest}
    >
      {loading ? <Loading /> : children}
    </div>
  );
};
