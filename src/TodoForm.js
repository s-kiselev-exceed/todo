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
    const id = param.currentTarget.id;
    this.setState({ [id]: param.currentTarget.value });
    console.log()
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      this.onBtnClickHandler();
    }
  };
  
  render() {
    const name = this.state.name;
    return (
      <div>
        <span
          onClick={this.props.itemsLeft}
          className="input"
          onClick={this.props.allChecked}
        >
          [Button]
        </span>
        <input
          onKeyPress={this.keyPressed}
          onChange={this.handleChange}
          value={name}
          className="input"
          readOnly={false}
          id='name'
          type="text"
          placeholder="What needs to be done?"
        />
      </div>
    );
  }
}
export default TodoForm;
