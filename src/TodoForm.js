import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class TodoForm extends React.Component {
  state = {
    name: ""
  };
  //Set values for items , delete wordspace and clear input
  addItem = () => {
    const name = this.state.name;
    if (name.replace(/\s+/g, " ").trim()) {
      toast("Task Added!");
      this.props.onAdd({
        id: +new Date(),
        text: name.replace(/\s+/g, " ").trim(),
        checked: false
      });
    }
    this.setState({ name: "" });
  };

  //Set current value for "name"
  inputValue = param => {
    this.setState({ name: param.currentTarget.value });
  };

  //Key "Inter" call next function
  keyPressed = event => {
    if (event.key === "Enter") {
      this.addItem();
    }
  };

  
  render() {
    const name = this.state.name;
    return (
      <div className="todo-form">
        <span className="round1">
          <input
            type="checkbox"
            id="checkbox-"
            onClick={this.props.allChecked}
          />
          <label htmlFor="checkbox-"></label>
        </span>
        <div className="add-item-input">
          <input
            className="input"
            onKeyPress={this.keyPressed}
            onChange={this.inputValue}
            value={name}
            readOnly={false}
            id="name"
            placeholder="What needs to be done?"
          />
        </div>
        <ToastContainer/>
      </div>
    );
  }
}
export default TodoForm;
