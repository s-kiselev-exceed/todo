import React from "react";
import axios from "axios";
import "./App.css";

class TodoItem extends React.Component {
  state = {
    readOnly: true,
    localText: this.props.item.text
  };

  onClickClose = () => {
    let newId = this.props.item._id;
    axios
      .delete(`http://localhost:1235/items/delete-item/${newId}`)
      .then(res => {
        this.props.removeItem(res.data.id);
      })
      .catch(err => console.log(err));
  };

  onChangeBox = () => {
    this.props.checkItem({
      id: this.props.item._id,
      checked: this.props.item.checked
    });
  };

  changeClick = () => {
    if (this.state.readOnly === true) {
      this.setState({ readOnly: false });
    }
  };

  changeClick = () => {
    if (this.state.readOnly === true) {
      this.setState({ readOnly: false });
    }
  };

  unChangeClick = () => {
    if (this.state.readOnly === false) {
      this.props.onEdit({
        id: this.props.item._id,
        text: this.state.localText
      });
    }
  };

  localChange = event => {
    this.setState({ localText: event.currentTarget.value });
  };

  render() {
    return (
      <div className="x-mark">
        <span className="check-box">
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
            this.props.item.checked
              ? "input-item line-through-item"
              : "input-item"
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
