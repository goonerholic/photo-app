/**@jsx jsx */
import React, { ReactElement } from 'react';
import { jsx } from '@emotion/core';

interface Props {
  isActive: boolean;
  title: string;
  onAdd: (title: string) => void;
  onRemove: (title: string) => void;
}

export default function SelectItem({
  isActive,
  title,
  onAdd,
  onRemove,
}: Props): ReactElement {
  const onClick = () => {
    if (isActive) {
      onRemove(title);
    } else {
      onAdd(title);
    }
  };

  return (
    <li
      className={`selectItem${isActive ? ' active' : ''}`}
      onClick={onClick}
      css={{
        minWidth: 120,
        cursor: 'pointer',
        '&.active': {
          color: 'blue',
        },
      }}
    >
      <p>{title}</p>
    </li>
  );
}
