import React from "react";

class TodoForm extends React.Component {
  state = {
    name: ""   
  };

  onBtnClickHandler = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.onAdd({
      id: +new Date(),
      text: name,
      checked : false,
    });
  };

  handleChange = e => {
    const { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value },
      );
    };

  render() {
    const { name } = this.state;
    return (
      <form >
        <input
          id="name"
          type="text"  
          onChange={this.handleChange}
          placeholder="What needs to be done?"
          value={name}/>

        <button onClick={this.onBtnClickHandler}>
          Click
        </button>
      </form>
    );
  }
}
export default TodoForm;
