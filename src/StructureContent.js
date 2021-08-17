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
  ExchangeNode,
  editable
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
          {editable && (
            <Col>
              <DragHandle />
            </Col>
          )}

          <Col flex={'70px'}>
            <Form.Item
              onBlur={e => {
                setTimeout(() => {
                  ChangeNode(
                    StructureItem.item_key,
                    e.target.value,
                    'position'
                  );
                }, 0);
              }}
            >
              <InputNumber
                disabled={!editable}
                defaultValue={parseInt(StructureItem.position)}
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Row gutter={10} style={{ flexWrap: 'nowrap' }}>
              <Col flex={1}>
                <Form.Item
                  onBlur={e => {
                    ChangeNode(
                      StructureItem.item_key,
                      e.target.value,
                      'detail'
                    );
                  }}
                >
                  <Input
                    disabled={!editable}
                    defaultValue={StructureItem.detail}
                  />
                </Form.Item>
              </Col>
              {editable && (
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
              )}
            </Row>
            {StructureItem.children ? (
              <StructureContent
                ChangeNode={ChangeNode}
                AddNode={AddNode}
                Structure={StructureItem.children}
                RemoveNode={RemoveNode}
                SetStructure={SetStructure}
                ExchangeNode={ExchangeNode}
                editable={editable}
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
