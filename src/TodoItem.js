import React from "react";

class TodoItem extends React.Component {
  state = {
    readOnly: true,
    localText: this.props.item.text,
  };

  onClickClose = () => {
    this.props.removeItem(this.props.item.id);
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
    const {id} = param.currentTarget
    this.setState({ [id]: param.currentTarget.value });
  };

  keyPr = event => {
    if (event.key === "Enter") {
      
    }
  };

  render() {
    return (
      <div>
        <span className="checkbox">
          <input
            type="checkbox"
            checked={this.props.item.checked}
            onChange={this.onChangeBox}
          />
        </span>
        <input
          onKeyPress={this.keyPr}
          onBlur={this.unChangeClick}
          onDoubleClick={this.changeClick}
          type="text"
          id="localText"
          onChange={this.localChange}
          readOnly={this.state.readOnly}
          value={this.state.localText}
        />
        <span onClick={this.onClickClose}>&times;</span>
      </div>
    );
  }
}
export default TodoItem;
