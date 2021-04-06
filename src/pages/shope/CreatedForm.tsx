import * as React from "react";
import './m.css'
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const fruits = require("./form-d.json");

interface Item {
  id: number;
  title: string;
  body: string;
  icon: string;
}

interface State {
  items: Item[];
}

export default class CreatedForm extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { items: fruits.fruits };
  }

  render() {
    // console.log('VerticalExample.render');
    const items = this.state.items;
    return (
      <div className="example vertical">
        <h2>Vertical Example: Draggable List of Fruits</h2>
        <p>Drag and drop items to re-order the list.</p>
        <RLDD
          cssClasses="list-container"
          items={items}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
      </div>
    );
  }

  private itemRenderer = (item: Item, index: number): JSX.Element => {
    return (
      <div className="item">
        <div className="icon">{item.icon}</div>
        <div className="details">
          <p className="title">{item.title}</p>
          <p className="body">{item.body}</p>
        </div>
        <div className="small">
          item.id: {item.id} - index: {index}
        </div>
      </div>
    );
  };

  private handleRLDDChange = (reorderedItems: Array<Item>) => {
    // console.log('Example.handleRLDDChange');
    this.setState({ items: reorderedItems });
  };
}
