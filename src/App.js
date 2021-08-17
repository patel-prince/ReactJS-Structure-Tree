import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './style.css';
import StructureComponent from './StructureComponent';
import { Form, Button } from 'antd';
import { data } from './data';

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
    SetStructure(data.structure);
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
