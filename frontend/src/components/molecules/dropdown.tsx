interface Props {
  show: boolean;
  fields: Field[];
}

type Field = {
  click: () => void;
  label: string;
};

export const Dropdown = ({ show, fields }: Props) => {
  return (
    <div
      className={`${
        show ? '' : 'hidden'
      } absolute right-2 top-10 z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
    >
      <ul
        className=' text-sm p-2.5 text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownDefaultButton'
      >
        {fields.map((field) => (
          <li
            key={field.label}
            onClick={field.click}
            className='block cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
          >
            {field.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
