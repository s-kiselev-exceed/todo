import React from "react";
import TodoItem from "./TodoItem.js";
class TodoList extends React.Component {

 renderList = () => {
   let list1=[...this.props.data];


if (this.props.status === 'all') {
}

if (this.props.status === 'active') {
  list1= list1.filter(item => item.checked === false)
}

if (this.props.status === 'done') {
  list1=list1.filter(item=> item.checked === true)
}
   const  data = list1;
   let newsTemplate = null;
   if (data.length) {
     newsTemplate = data.map((item) => {
       return <TodoItem key={item.id} item={item} removeItem={this.props.removeItem}
       checkItem={this.props.checkItem} taskChange={this.props.taskChange}/>;
     });
   }
   return newsTemplate;
 };
 render() {
   return <div >{this.renderList()}</div>;
 }
}
export default TodoList;
