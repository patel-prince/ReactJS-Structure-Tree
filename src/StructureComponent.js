import React from 'react';
import StructureHeader from './StructureHeader';
import StructureContent from './StructureContent';
import { arrayMoveImmutable } from 'array-move';

const StructureComponent = ({
  Structure = [],
  MainStructure = [],
  SetStructure,
  forceUpdate,
  editable,
}) => {
  // Variables -------------------

  // Functions -------------------

  const AddNode = (ItemKey) => {
    let finalData = MainStructure;
    let position = 1;
    let detail = '';
    let item_key = null;

    const add = (NodeArray, ItemKey) => {
      console.log(NodeArray);
      NodeArray.forEach((x, index) => {
        if (x.item_key === ItemKey) {
          if (!x.children) {
            x.children = [];
          } else {
            if (x.children.length > 0) {
              position =
                parseInt(x.children[x.children.length - 1].position) + 1;
            } else {
              position = 1;
            }
          }
          item_key = [x.item_key, x.children.length].join('-');
          detail = 'This - ' + position + '++' + item_key;
          x.children.push({ item_key, position, detail });
        } else {
          if (x.children && x.children.length > 0) {
            add(x.children, ItemKey);
          }
        }
      });
    };
    if (ItemKey) {
      add(finalData, ItemKey, [ItemKey]);
    } else {
      if (finalData.length > 0) {
        position = parseInt(finalData[finalData.length - 1].position) + 1;
        item_key = finalData.length + 1;
      } else {
        position = 1;
        item_key = 1;
      }
      detail = 'This - ' + position + '++' + item_key;
      finalData.push({ item_key, position, detail });
    }
    SetStructure(finalData);
    forceUpdate();
  };

  const RemoveNode = (ItemKey) => {
    let finalData = MainStructure;
    const remove = (NodeArray, ItemKey) => {
      NodeArray.forEach((x, index) => {
        if (x.item_key === ItemKey) {
          NodeArray.splice(index, 1);
        } else {
          if (x.children && x.children.length > 0) {
            remove(x.children, ItemKey);
          }
        }
      });
    };
    remove(finalData, ItemKey);
    SetStructure(finalData);
    forceUpdate();
  };

  const ChangeNode = (ItemKey, Value, key) => {
    let finalData = MainStructure;
    const change = (NodeArray, ItemKey) => {
      NodeArray.forEach((x, index) => {
        if (x.item_key === ItemKey) {
          x[key] = Value;
        } else {
          if (x.children && x.children.length > 0) {
            change(x.children, ItemKey);
          }
        }
      });
    };
    change(finalData, ItemKey);
    SetStructure(finalData);
    // forceUpdate();
  };

  const ExchangeNode = (ItemKey, { oldIndex, newIndex }) => {
    let finalData = MainStructure;
    const loop = (NodeArray, ItemKey, Parent) => {
      NodeArray.forEach((x, index) => {
        if (x.item_key === ItemKey) {
          if (Parent) {
            Parent.children = arrayMoveImmutable(NodeArray, oldIndex, newIndex);
          } else {
            finalData = arrayMoveImmutable(NodeArray, oldIndex, newIndex);
          }
        } else {
          if (x.children && x.children.length > 0) {
            loop(x.children, ItemKey, x);
          }
        }
      });
    };
    loop(finalData, ItemKey);
    SetStructure(finalData);
    forceUpdate();
  };

  // Markup ----------------------
  return (
    <div>
      <StructureHeader
        AddNode={AddNode}
        MainStructure={MainStructure}
        editable={editable}
      />
      <StructureContent
        AddNode={AddNode}
        Structure={MainStructure}
        RemoveNode={RemoveNode}
        ChangeNode={ChangeNode}
        SetStructure={SetStructure}
        ExchangeNode={ExchangeNode}
        editable={editable}
      />
    </div>
  );
};

export default StructureComponent;
