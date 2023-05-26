interface Props {
  initials: string;
}

export const Avatar = ({ initials }: Props) => {
  const truncateInitials = (initials: string) => {
    const initialsArray = initials.split(' ');
    return initialsArray.length > 1
      ? `${initialsArray[0][0].toUpperCase()}${initialsArray[
          initialsArray.length - 1
        ][0].toUpperCase()}`
      : initialsArray[0][0];
  };

  return (
    <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
      <span className='font-medium text-gray-600 dark:text-gray-300'>
        {truncateInitials(initials)}
      </span>
    </div>
  );
};
