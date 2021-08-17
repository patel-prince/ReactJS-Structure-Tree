import React from 'react';
import { Button, Divider } from 'antd';

const StructureHeader = ({ AddNode, editable }) => {
  // Variables -------------------

  // Functions -------------------

  // Markup ----------------------
  return (
    <div>
      {editable && (
        <Button className="mr-24" onClick={() => AddNode()}>
          Add
        </Button>
      )}
      <Button>View Structure</Button>
      <Divider />
    </div>
  );
};

export default StructureHeader;
