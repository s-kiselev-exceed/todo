import React from "react";
import axios from 'axios';
import "./App.css";

class TodoItem extends React.Component {
  state = {
    readOnly: true,
    localText: this.props.item.text,
  };
    
  onClickClose = () => {
    this.props.removeItem(this.props.item.id);
    axios.delete(`localhost:1234/users/${this.props.item.id}/delete`)
    .then(res => {
      console.log(res);
    })
  };

  onChangeBox = () => {
    this.props.checkItem(this.props.item.id);
  };

  changeClick = () => {
    if (this.state.readOnly === true) {
      this.setState({ readOnly: false });
    }
  };

  unChangeClick = () => {
    if (this.state.readOnly === false) {
      this.setState({ readOnly: true });
    }
  };

  localChange = param => {
    this.setState({ localText: param.currentTarget.value });
  };

  render() {
    return (
      <div className="xMark">
        <span className="round">
          <input
            type="checkbox"
            id={this.props.item.id}
            checked={this.props.item.checked}
            onChange={this.onChangeBox}
          />
          <label htmlFor={this.props.item.id}></label>
        </span>
        <input
          type="text"
          className={
            this.props.item.checked ? "localText line-through-item":"localText"
          }
          id={this.props.item.id}
          value={this.state.localText}
          onChange={this.localChange}
          readOnly={this.state.readOnly}
          onKeyPress={this.addItem}
          onBlur={this.unChangeClick}
          onDoubleClick={this.changeClick}
        />
        <span onClick={this.onClickClose}>X</span>
      </div>
    );
  }
}
export default TodoItem;
