export const Loading = () => {
  return (
    <div className='animate-pulse'>
      <div className='flex items-center gap-4'>
        <svg
          className='text-gray-200 w-10 h-10 dark:text-zinc-700'
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
        <div className='h-4 bg-gray-200 rounded-full dark:bg-zinc-700 w-36' />
        <div className='flex-grow' />
        <div className='h-5 bg-gray-200 rounded-full dark:bg-zinc-700 w-5' />
        <div className='h-5 bg-gray-200 rounded-full dark:bg-zinc-700 w-5' />
      </div>
      <hr className='my-8' />
      <div className='h-8 my-4 bg-gray-200 rounded-md dark:bg-zinc-700 w-full' />
      <div className='h-8 my-4 bg-gray-200 rounded-md dark:bg-zinc-700 w-full' />
      <div className='h-8 my-4 bg-gray-200 rounded-md dark:bg-zinc-700 w-full' />
    </div>
  );
};
