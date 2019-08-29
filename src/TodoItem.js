import React from "react";


class TodoItem extends React.Component {

   onClickClose=()=> {
       this.props.removeItem(this.props.item.id);
     }
     onChangeBox=()=>{
       this.props.checkItem(this.props.item.id)
     }
     onChange=()=>{
       this.props.taskChange(this.props.item.id,
        this.props.item.text)

     }
   render() {
       const text = this.props.item.text
       return (
         <div >
              <span className="checkbox"  >
           <input type='checkbox' checked={this.props.item.checked}  onChange={this.onChangeBox}/>
           </span>
           <input onDoubleClick={this.onChange} readOnly={true} value={text}/>
            <button type="button" onClick={this.onClickClose}>&times;</button>
         </div>
       )
     }
   }
export default TodoItem;
