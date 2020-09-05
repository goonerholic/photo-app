import React, { ReactElement } from 'react';
import { Row, Col, Button } from 'antd';
import { signOut } from '../../utils/gapi';

interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <Row>
      <Col>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </Col>
    </Row>
  );
}
