import { classNames } from '@/components/Common';

type TOptionProps = {
  className?: string;
  label?: string;
  value?: boolean;
};

export default function Option(props: TOptionProps) {
  const { className, label, value } = props;
  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className={classNames(['block', 'font-bold', value ? 'text-green-600' : 'text-red-700'])}>
        {value ? 'Yes' : 'No'}
      </div>
    </div>
  );
}
