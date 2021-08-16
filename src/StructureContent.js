import React from 'react';
import { Row, Col, Form, Input, Button, InputNumber } from 'antd';

const StructureContent = ({ ChangeNode, AddNode, Structure, RemoveNode }) => {
  // Variables -------------------

  // Functions -------------------

  // Markup ----------------------
  console.log(Structure);
  return Structure.map((StructureItem, index) => {
    return (
      <Row gutter={24} key={index} style={{ flexWrap: 'nowrap' }}>
        <Col flex={'80px'}>
          <Form.Item
            onChange={e => {
              ChangeNode(StructureItem.item_key, e.target.value, 'position');
            }}
          >
            <InputNumber value={parseInt(StructureItem.position)} />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Row gutter={24} key={index}>
            <Col flex={1}>
              <Form.Item
                onChange={e => {
                  ChangeNode(StructureItem.item_key, e.target.value, 'detail');
                }}
              >
                <Input value={StructureItem.detail} />
              </Form.Item>
            </Col>
            <Col>
              {(StructureItem.item_key + '').split('-').length < 3 && (
                <Button
                  onClick={() => {
                    AddNode(StructureItem.item_key);
                  }}
                >
                  Add Child
                </Button>
              )}

              <Button
                type="danger"
                onClick={() => {
                  RemoveNode(StructureItem.item_key);
                }}
              >
                Remove
              </Button>
            </Col>
          </Row>
          {StructureItem.children ? (
            <StructureContent
              ChangeNode={ChangeNode}
              AddNode={AddNode}
              Structure={StructureItem.children}
              RemoveNode={RemoveNode}
            />
          ) : null}
        </Col>
      </Row>
    );
  });
};

export default StructureContent;
