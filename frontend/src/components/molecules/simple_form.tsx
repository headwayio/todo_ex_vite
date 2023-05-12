import { Button } from '../atoms/button';

interface Props {
  handleSubmit: (e: React.FormEvent<EventTarget>) => void;
  fields: Field<BaseField>[];
}

type Field<P> = P & (FieldSelect | FieldInput);

interface FieldSelect {
  type: 'select';
  options: Option[] | [];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface FieldInput {
  type: 'text' | 'email' | 'password' | 'textbox';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface BaseField {
  id: string;
  name?: string;
  value: string | number;
  placeholder?: string;
  label?: string;
}

type Option = {
  value: string | number;
  text: string;
};

export const SimpleForm = ({ handleSubmit, fields }: Props) => {
  const inputClass =
    'mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          {field.label && (
            <label
              htmlFor={field.id}
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {field.label}
            </label>
          )}
          {field.type === 'select' ? (
            <select
              id={field.id}
              className={inputClass}
              onChange={field.onChange}
            >
              {field.options &&
                field.options.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.id}
              className={inputClass}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </div>
      ))}
      <Button type='submit' text='Create' variant='primary' size='full' />
    </form>
  );
};
