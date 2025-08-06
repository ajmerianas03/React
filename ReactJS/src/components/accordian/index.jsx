import React, { useState } from "react";
import items from "./items";
import "./style.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelection = (id) => {
    let cpy = [...multiple];
    const index = cpy.indexOf(id);

    if (index === -1) {
      cpy.push(id);
    } else {
      cpy.splice(index, 1);
    }

    setMultiple(cpy);
  };

  const isItemExpanded = (id) => {
    return multiSelect ? multiple.includes(id) : selected === id;
  };

  const getIcon = (id) => {
    return isItemExpanded(id) ? "-" : "+";
  };

  return (
    <div className="wrapper">
      <button onClick={() => setMultiSelect(!multiSelect)} style={{ marginBottom: "20px" }}>
        {multiSelect ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>
      <div className="accordion">
        {items && items.length > 0 ? (
          items.map((itemData) => (
            <div className="item" key={itemData.id}>
              <div
                onClick={() =>
                  multiSelect
                    ? handleMultiSelection(itemData.id)
                    : handleSingleSelection(itemData.id)
                }
                className="title"
              >
                <h3>{itemData.question}</h3>
                <span>{getIcon(itemData.id)}</span>
              </div>
              {isItemExpanded(itemData.id) && (
                <div className="content">{itemData.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
