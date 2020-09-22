/**@jsx jsx */
import React, { ReactElement } from 'react';
import { jsx } from '@emotion/core';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

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
    <CheckableTag
      // className={`selectItem${isActive ? ' active' : ''}`}
      // onClick={onClick}
      // css={{
      //   minWidth: 120,
      //   cursor: 'pointer',
      //   border: '1px solid #51C7BF',
      //   borderRadius: 8,
      //   marginRight: 4,
      //   marginBottom: 4,
      //   textAlign: 'center',
      //   '&.active': {
      //     color: 'black',
      //     backgroundColor: '#73DDD6',
      //   },
      //   '&:hover': {
      //     backgroundColor: '#84EDE1',
      //   },
      // }}
      key={title}
      checked={isActive}
      onChange={onClick}
      css={{
        marginBottom: '1rem',
        minWidth: 110,
      }}
    >
      {title}
    </CheckableTag>
  );
}
