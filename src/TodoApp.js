import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import todos from "./App.css";
import { all } from "q";
class TodoApp extends React.Component {
 state = {
   list:[],
   status: 'all',
   
 };

//Add array
 handleAdd = data => {
   const newItem = [data, ...this.state.list];
   this.setState({ list: newItem });
 };
//delet 1 item
 removeItem = id => {
   const newArray = this.state.list.filter(item => item.id !== id);
   this.setState({ list: newArray });
};
//&&&
   checkItem = param => {
     const newId = this.state.list.map(item => {
       if (item.id === param) {
         item.checked = !item.checked;
       }
       return item
     });
     this.setState({ list: newId });
   };
//clear all done
   allClear=()=>{
       const newAr=this.state.list.filter(item=>item.checked === false)
      this.setState({list :newAr})
   }

 allCheck=(param)=>{
   const newAr=this.state.list.map(item=>{
     if(item.id !== param){
     item.checked = !item.checked;
   }
   else{
     item.checked=true
   }
   return item
 });
   this.setState({list :newAr})
   console.log({list : newAr})
 }
// filter done
 filterDone=()=>{
   this.setState({ status : 'done' });
 }
 // filter undone
 filterUnDone=()=>{
  this.setState({ status : 'active' });
 }
 // filter all
  allTask=()=>{
    this.setState({ status : 'all' });
 }

/*taskChange=(id,name)=>{
  const newId = this.state.list.map(item => {
    if (item.id === id) {
      item.text = name;
    }
    return item
  });
  this.setState({ list: newId });
  console.log(newId)
};
*/

itemsLeft=()=>{
  const newAr=this.state.list.filter(item=>item.checked === true)
 this.setState({list :newAr})
 console.log(this.item)
}
 

 render() {
   return (
     <div className="appDiv">
       <h1 className="todos">todos</h1>
       <TodoForm onAdd={this.handleAdd}
       allCheck={this.allCheck}
       filterDone={this.filterDone}
       filterUnDone={this.filterUnDone}
       allTask={this.allTask}
       />
       <TodoList
         data={this.state.list}
         status={this.state.status}
         removeItem={this.removeItem}
         checkItem={this.checkItem}
         taskChange={this.taskChange}
         
         />
       <div>
       <span > items left</span>
       <button onClick={this.allTask}>All</button> 
       <button onClick={this.filterUnDone}>Active</button>
       <button onClick={this.filterDone}>Completed</button>
       <button onClick={this.allClear} >Clear completed</button>
       </div>
     </div>
   );
 }
}

export default TodoApp;
