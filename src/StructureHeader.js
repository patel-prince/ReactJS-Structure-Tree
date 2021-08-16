import React from 'react';
import { Button, Divider } from 'antd';

const StructureHeader = ({ AddNode, MainStructure }) => {
  // Variables -------------------

  // Functions -------------------

  // Markup ----------------------
  return (
    <div>
      <Button onClick={() => AddNode()}>Add</Button>
      <Button className="ml-24">View Structure</Button>
      <Divider />
    </div>
  );
};

export default StructureHeader;
