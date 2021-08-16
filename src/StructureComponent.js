import React from 'react';
import StructureHeader from './StructureHeader';
import StructureContent from './StructureContent';
import debounce from 'lodash/debounce';

const StructureComponent = ({
  Structure = [],
  MainStructure = [],
  SetStructure,
  forceUpdate
}) => {
  // Variables -------------------

  // Functions -------------------

  const GetCurrentNode = (NodeArray, ItemKey) => {
    if (ItemKey) {
      let Node = null;
      NodeArray.forEach(x => {
        if (x.item_key === ItemKey) {
          Node = x;
          return false;
        } else {
          if (x.children && x.children.length > 0) {
            Node = GetCurrentNode(x.children, ItemKey);
          }
        }
      });
      if (ItemKey) {
        return { Node, NodeArray };
      }
    }
    return null;
  };

  const AddNode = ItemKey => {
    let finalData = MainStructure;
    let position = 1;
    let detail = '';
    let item_key = null;

    const add = (NodeArray, ItemKey) => {
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
          detail = 'This is the dummy text from position - ' + position;
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
        item_key = parseInt(finalData[finalData.length - 1].item_key) + 1;
      } else {
        position = 1;
        item_key = 1;
      }
      detail = 'This is the dummy text from position - ' + position;
      finalData.push({ item_key, position, detail });
    }
    SetStructure(finalData);
    forceUpdate();
  };

  const RemoveNode = ItemKey => {
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
    const remove = (NodeArray, ItemKey) => {
      NodeArray.forEach((x, index) => {
        if (x.item_key === ItemKey) {
          x[key] = Value;
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

  // Markup ----------------------
  return (
    <div>
      <StructureHeader AddNode={AddNode} MainStructure={MainStructure} />
      <StructureContent
        AddNode={AddNode}
        Structure={Structure}
        RemoveNode={RemoveNode}
        ChangeNode={ChangeNode}
      />
    </div>
  );
};

export default StructureComponent;
