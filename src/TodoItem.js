import React from "react";

class TodoItem extends React.Component {

    onClickClose=()=> {
        this.props.removeItem(this.props.item.id);
      }

      onChangeBox=()=>{
        this.props.checkItem(this.props.item.id)
      }

    render() {
        const text = this.props.item.text
        return (
          <div >       
            <input type='checkbox' checked={this.props.item.checked}  onChange={this.onChangeBox}/>
            {text}
             <button type="button" onClick={this.onClickClose}>&times;</button>
          </div>
        )
      }
    }
export default TodoItem;
