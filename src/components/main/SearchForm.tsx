/** @jsx jsx */
import React, { ReactElement } from 'react';
import SelectItem from './SelectItem';
import { jsx } from '@emotion/core';
import { Col, Row } from 'antd';
import { Button } from 'antd';

interface Props {
  keywords: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
  onSubmit: (keywords: string[], pageSize?: number, pageToken?: string) => void;
  onClear: () => void;
}

const categories = [
  'ANIMALS',
  'FASHION',
  'LANDMARKS',
  'RECEIPTS',
  'WEDDINGS',
  'ARTS',
  'FLOWERS',
  'LANDSCAPES',
  'SCREENSHOTS',
  'WHITEBOARDS',
  'BIRTHDAYS',
  'FOOD',
  'NIGHT',
  'SELFIES',
  'CITYSCAPES',
  'GARDENS',
  'PEOPLE',
  'SPORT',
  'CRAFTS',
  'HOLIDAYS',
  'PERFORMANCES',
  'TRAVEL',
  'DOCUMENTS',
  'HOUSES',
  'PETS',
  'UTILITY',
];

export default function SearchForm({
  keywords,
  onAdd,
  onRemove,
  onSubmit,
  onClear,
}: Props): ReactElement {
  return (
    <div>
      <Row
        className="searchForm"
        css={{
          marginTop: '2rem',
        }}
        justify="center"
      >
        <Col xl={12} sm={18} xs={20}>
          <ul
            css={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              listStyle: 'none',
            }}
          >
            {categories.map((category) => (
              <SelectItem
                isActive={keywords.includes(category)}
                title={category}
                onAdd={onAdd}
                onRemove={onRemove}
                key={category}
              />
            ))}
          </ul>
        </Col>
      </Row>
      <Row justify="center">
        <Col
          css={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="primary"
            onClick={(e: React.MouseEvent) => {
              onSubmit(keywords, 20);
            }}
            css={{
              marginRight: '1rem',
            }}
          >
            Search
          </Button>
          <Button onClick={onClear}>선택 초기화</Button>
        </Col>
      </Row>
    </div>
  );
}
