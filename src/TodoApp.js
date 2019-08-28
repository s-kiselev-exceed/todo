import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class TodoApp extends React.Component {
  state = {
    list: []
  };

  handleAdd = data => {
    const newItem = [data, ...this.state.list];
    this.setState({ list: newItem });
    console.log()
    
  };

  removeItem = id => {
    const newArray = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newArray });
};
    checkItem = param => {
      const newId = this.state.list.map(item => {
        if (item.id === param) {
          item.checked = !item.checked;
        }
        return item
      });   
      this.setState({ list: newId });
      console.log(newId)
    };


    allClear=()=>{
        const newAr=this.state.list.filter(item=>item.checked === false)
       this.setState({list :newAr})

    }
    
  render() {
    return (
      <div>
        <h1>todos</h1>
        <TodoForm onAdd={this.handleAdd} />
        <TodoList
          data={this.state.list}
          removeItem={this.removeItem}
          checkItem={this.checkItem} />
        <button onClick={this.allClear} >delete checked</button>
        <p>All tasks = {this.state.list.length}</p>
      </div>
    );
  }
}
export default TodoApp;
