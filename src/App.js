import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './style.css';
import StructureComponent from './StructureComponent';
import { Form, Button } from 'antd';

export default function App() {
  // Variables -------------------
  const [form] = Form.useForm();
  const [Structure, SetStructure] = useState();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // Functions -------------------

  const handleSubmit = data => {
    console.log(
      JSON.stringify({
        ...data,
        structure: Structure
      })
    );
  };

  useEffect(() => {
    SetStructure([
      {
        item_key: 1,
        position: 1,
        detail: 'This is the dummy text from position - 1',
        children: [
          {
            item_key: '1-0',
            position: 1,
            detail: 'This is the dummy text from position - 1'
          },
          {
            item_key: '1-1',
            position: 2,
            detail: 'This is the dummy text from position - 2'
          }
        ]
      },
      {
        item_key: 2,
        position: 2,
        detail: 'This is the dummy text from position - 2',
        children: [
          {
            item_key: '2-0',
            position: 1,
            detail: 'This is the dummy text from position - 1'
          }
        ]
      },
      {
        item_key: 3,
        position: 3,
        detail: 'This is the dummy text from position - 3',
        children: [
          {
            item_key: '3-0',
            position: 1,
            detail: 'This is the dummy text from position - 1'
          },
          {
            item_key: '3-1',
            position: 2,
            detail: 'This is the dummy text from position - 2'
          }
        ]
      }
    ]);
  }, []);

  // Markup ----------------------
  return (
    <Form form={form} style={{ padding: 24 }} onFinish={handleSubmit}>
      <StructureComponent
        MainStructure={Structure}
        Structure={Structure}
        SetStructure={SetStructure}
        forceUpdate={forceUpdate}
      />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
