import React from "react";
import "react-toastify/dist/ReactToastify.css";

class TodoForm extends React.Component {
  state = {
    name: ""
  };
  //Set values for items , delete wordspace and clear input
  addItem = () => {
    const name = this.state.name;
    if (name.replace(/\s+/g, " ").trim()) {
      this.props.onAdd({
        id: +new Date(),
        text: name.replace(/\s+/g, " ").trim(),
        checked: false
      });
    }
    this.setState({ name: "" });
  };

  //Set current value for "name"
  inputValue = event => {
    this.setState({ name: event.currentTarget.value });
  };

  //Key "Inter" call next function
  pressKey = event => {
    if (event.key === "Enter") {
      this.addItem();
    }
  };

  checkAll = () => {
    this.props.checkAllItems({ checked: this.props.switcher });
  };

  render() {
    const name = this.state.name;
    return (
      <div className="todo-form">
        <span
          className={
            this.props.switcher === true
              ? "main-check-box label"
              : "main-check-box label:after"
          }
        >
          <input type="checkbox" id="checkbox" onClick={this.checkAll} />
          <label htmlFor="checkbox"></label>
        </span>
        <div className="input-form">
          <input
            className="input-text"
            onKeyPress={this.pressKey}
            onChange={this.inputValue}
            value={name}
            readOnly={false}
            id="name"
            placeholder="What needs to be done?"
          />
        </div>
      </div>
    );
  }
}
export default TodoForm;
