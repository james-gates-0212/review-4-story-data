'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

type TTagInputProps = {
  className?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

const TagInput = forwardRef((props: TTagInputProps, ref) => {
  const { className, label, name, placeholder, value, readOnly } = props;

  const [selected, setSelected] = useState([]);

  useImperativeHandle(ref, () => ({
    getTags() {
      return selected;
    },
  }));

  useEffect(() => {
    setSelected((value || '').split(/[ ]*,[ ]*/).filter(Boolean));
  }, [value]);

  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <TagsInput
        classNames={{ input: 'flex-grow' }}
        disabled={readOnly}
        name={name}
        onChange={setSelected}
        placeHolder={placeholder}
        value={selected}
      />
    </div>
  );
});

export default TagInput;
