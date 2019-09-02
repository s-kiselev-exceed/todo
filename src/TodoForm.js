import React from "react";
class TodoForm extends React.Component {
  state = {
    name: ""
  };

  onBtnClickHandler = () => {
    const name = this.state.name;
    this.props.onAdd({
      id: +new Date(),
      text: name,
      checked: false
    });
    this.setState({ name: "" });
  };

  handleChange = param => {
    this.setState({ name: param.currentTarget.value });
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      this.onBtnClickHandler();
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
            onClick={this.props.itemsLeft}
            onClick={this.props.allChecked}
          />
          <label for="checkbox-"></label>
        </span>
        <div className="add-item-input">
          <input
            className="input"
            onKeyPress={this.keyPressed}
            onChange={this.handleChange}
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
