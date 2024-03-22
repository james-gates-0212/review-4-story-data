type TTextAreaProps = {
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

export default function TextArea(props: TTextAreaProps) {
  const { className, id, label, name, placeholder, value, readOnly } = props;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        className="block w-full min-h-18 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
}
