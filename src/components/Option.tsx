type TOptionProps = {
  className?: string;
  label?: string;
  value?: string;
};

export default function Option(props: TOptionProps) {
  const { className, label, value } = props;
  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="block font-bold">{value}</div>
    </div>
  );
}
