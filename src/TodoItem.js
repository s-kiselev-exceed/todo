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
    axios.delete(`http://localhost:1235/users/remove/${newId}`)
      .then(res => {
        this.props.removeItem(this.props.item.id);
      })
      .catch(err => console.log(err));
  };

  onChangeBox = () => {
    this.props.checkItem(this.props.item._id);
  };

  changeClick = () => {
    if (this.state.readOnly === true) {
      this.setState({ readOnly: false });
    }
  };

  unChangeClick = () => {
    if (this.state.readOnly === false) { 
      
    this.props.onEdit({id:this.props.item.id,text:this.state.localText})
    //   const newItem=this.props.onAdd(id,text).map(data => {
        
    //     if (data.id === this.props.item.id) 
    //     {
    //       data.text = this.state.localText;
    //     }
    //     return data;
    //   });
    }

  };
  //   const newId = this.props.item._id;
  ///    this.setState({ readOnly: true });
  //   console.log("item text", this.props.item.text);
  //   axios.put(`http://localhost:1235/users/update/task/${newId}`,data)
  //   .then(res=>{
  //     this.props.onAdd(res.data)
  // });
  //
  // this.setState({ readOnly: true });

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
            this.props.item.checked
              ? "localText line-through-item"
              : "localText"
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
