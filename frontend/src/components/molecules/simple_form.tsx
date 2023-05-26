import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';
import { Button } from '../atoms/button';

interface Props<T> extends ComponentPropsWithoutRef<'form'> {
  handleSubmit: (e: React.FormEvent<EventTarget>) => void;
  fields: Field<BaseField>[];
  state: T;
  setState: Dispatch<SetStateAction<T>>;
}

type Field<P> = P & (FieldSelect | FieldInput);

interface FieldSelect {
  type: 'select';
  options: Option[] | [];
}

interface FieldInput {
  type: 'text' | 'email' | 'password' | 'textbox';
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

type EventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export function SimpleForm<T>({
  handleSubmit,
  fields,
  state,
  setState,
  ...rest
}: Props<T>) {
  const handleChange = (e: EventType) => {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const inputClass =
    'mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {fields.map((field) => (
        <div key={field.name}>
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
              onChange={handleChange}
            >
              {field.options &&
                field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
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
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <Button type='submit' text='Create' variant='primary' size='full' />
    </form>
  );
}
