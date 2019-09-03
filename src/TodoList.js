import React from "react";
import TodoItem from "./TodoItem.js";
class TodoList extends React.Component {
  renderList = () => {
    let array = [...this.props.list];

    if (this.props.status === "all") {
    }

    if (this.props.status === "active") {
      array = array.filter(item => item.checked === false);
    }

    if (this.props.status === "done") {
      array = array.filter(item => item.checked === true);
    }

    let newsTemplate;

    if (array.length) {
      newsTemplate = array.map(item => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            removeItem={this.props.removeItem}
            checkItem={this.props.checkItem}
            itemsLeft={this.props.itemsLeft}
          />
        );
      });
    }
    return newsTemplate;
  };

  render() {
    return <div className="todo-list">{this.renderList()}</div>;
  }
}
export default TodoList;
