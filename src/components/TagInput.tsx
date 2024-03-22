'use client';

import { classNames } from '@/components/Common';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import styles from './TagInput.module.css';

type TTagInputProps = {
  className?: string;
  label?: string;
  limits?: [number, number];
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

const TagInput = forwardRef((props: TTagInputProps, ref) => {
  const { className, label, limits, name, placeholder, readOnly, value } = props;
  const [min, max] = limits || [];

  const [selected, setSelected] = useState([]);

  const invalidTagLimit = () => {
    if (!limits) {
      return false;
    }
    return selected.length < min || selected.length > max;
  };

  const disableRemove = () => selected.length <= min;

  const renderLimit = () => {
    if (!limits) {
      return <span>{selected.length}</span>;
    }
    return `${selected.length} / ${max}`;
  };

  useImperativeHandle(ref, () => ({
    getTags() {
      return selected;
    },
  }));

  useEffect(() => {
    setSelected(Array.from(new Set((value || '').split(/[ ]*,[ ]*/).filter(Boolean))));
  }, [value]);

  return (
    <div className={className}>
      <label
        className={classNames([
          'flex',
          'flex-row',
          'justify-between',
          'text-sm',
          'font-medium',
          'leading-6',
          invalidTagLimit() ? 'text-red-600' : 'text-gray-900',
        ])}
      >
        {label}
        <span className="inline-block rounded-md shadow-gray-600 shadow-sm bg-gray-300 mb-1 px-2">{renderLimit()}</span>
      </label>
      <TagsInput
        classNames={{ input: 'flex-grow', tag: disableRemove() ? styles.disableRemove : '' }}
        disabled={readOnly}
        name={name}
        onChange={setSelected}
        placeHolder={placeholder}
        value={selected}
        disableBackspaceRemove={disableRemove()}
        isEditOnRemove={false}
      />
    </div>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
