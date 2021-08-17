import React from 'react';
import { Row, Col, Form, Input, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined, MenuOutlined } from '@ant-design/icons';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

const StructureContent = ({
  ChangeNode,
  AddNode,
  Structure,
  RemoveNode,
  SetStructure,
  ExchangeNode
}) => {
  // Variables -------------------

  // Functions -------------------

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (Structure && Structure[0]) {
      let ItemKey = Structure[0].item_key;
      ExchangeNode(ItemKey, { oldIndex, newIndex });
    }
    // SetStructure(arrayMove(Structure, oldIndex, newIndex));
  };

  // Markup ----------------------

  // set menu icon component
  const DragHandle = SortableHandle(() => (
    <div style={{ padding: '5px 10px 5px 0px' }}>
      <MenuOutlined />
    </div>
  ));

  const SortableItem = SortableElement(
    ({ value: { StructureItem, index } }) => (
      <div className="fields_draggable_wrapper">
        <Row key={index} style={{ flexWrap: 'nowrap' }}>
          <Col>
            <DragHandle />
          </Col>
          <Col flex={'70px'}>
            <Form.Item
              onChange={e => {
                ChangeNode(StructureItem.item_key, e.target.value, 'position');
              }}
            >
              <InputNumber value={parseInt(StructureItem.position)} />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Row gutter={10} style={{ flexWrap: 'nowrap' }}>
              <Col flex={1}>
                <Form.Item
                  onChange={e => {
                    ChangeNode(
                      StructureItem.item_key,
                      e.target.value,
                      'detail'
                    );
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
                    <PlusOutlined />
                  </Button>
                )}

                <Button
                  type="danger"
                  onClick={() => {
                    RemoveNode(StructureItem.item_key);
                  }}
                >
                  <MinusOutlined />
                </Button>
              </Col>
            </Row>
            {StructureItem.children ? (
              <StructureContent
                ChangeNode={ChangeNode}
                AddNode={AddNode}
                Structure={StructureItem.children}
                RemoveNode={RemoveNode}
                SetStructure={SetStructure}
                ExchangeNode={ExchangeNode}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    )
  );

  const SortableList = SortableContainer(({ items }) => (
    <div className="fields_draggable_container">
      {items.map((StructureItem, index) => (
        <SortableItem
          key={index}
          index={index}
          value={{ StructureItem, index }}
        />
      ))}
    </div>
  ));

  return (
    <SortableList
      useDragHandle={true}
      items={Structure}
      onSortEnd={onSortEnd}
    />
  );
};

export default StructureContent;
