import React from "react";
import TodoItem from "./TodoItem.js";

class TodoList extends React.Component {


  renderList = () => {
    const  dat = this.props.data;
    let newsTemplate = null;
    if (dat.length) {
      newsTemplate = dat.map((item) => {
        return <TodoItem key={item.id} item={item} removeItem={this.props.removeItem} 
        checkItem={this.props.checkItem} handleChange={this.handleChange}/>;
      });
    }
    return newsTemplate;
  };
  render() {
    return <div>{this.renderList()}</div>;
  }
}
export default TodoList;
