import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class TodoApp extends React.Component {
  state = {
    list: [],
    status: "all",
    switcher: false,
    lengthArray: [],
    borderButton: "okey",
  };

  //Add array
  onAdd = data => {
    const newItem = [data, ...this.state.list];
    this.setState({ list: newItem });
  };

  //Delete item
  removeItem = id => {
    const newArray = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newArray });
  };
  //Checked item
  checkItem = param => {
    const newId = this.state.list.map(item => {
      if (item.id === param) {
        item.checked = !item.checked;
      }
      return item;
    });
    this.setState({ list: newId });
  };
  //Clear all done
  allClear = () => {
    toast("Tasks Cleared!");
    const newAr = this.state.list.filter(item => item.checked === false);
    this.setState({ list: newAr });
    this.setState({ borderButton:'clear' });
  };

  //Checked all items
  allChecked = () => {
    const newArr = this.state.list.map(item => {
      if (this.state.switcher === false) {
        item.checked = true;
        this.setState({ switcher: true });
      } else {
        item.checked = false;
        this.setState({ switcher: false });
      }
      return item;
    });
    this.setState({ list: newArr });
  };
  // Filter for done items
  filterDone = () => {
    toast("Completed Tasks list!");
    this.setState({ status: "done" });
    this.setState({ borderButton: "completed" });
  };
  // Filter for undone items
  filterUnDone = () => {
    toast("Active Tasks list!");
    this.setState({ status: "active" });
    this.setState({ borderButton: "active" });
  };
  // Filter for all items
  allTask = () => {
    toast("All Tasks list!");
    this.setState({ status: "all" });
    this.setState({ borderButton: "all" });
  };
  render() {
    const length = this.state.list.filter(item => item.checked === true).length;
    return (
      <div>
        <h1 className="todos">todos</h1>

        <div className="marg">
          <TodoForm onAdd={this.onAdd} allChecked={this.allChecked} />
          <TodoList
            itemsLeft={this.itemsLeft}
            list={this.state.list}
            status={this.state.status}
            removeItem={this.removeItem}
            checkItem={this.checkItem}
            taskChange={this.taskChange}
          />
          <ToastContainer />
          <div className="footer">
            <div className="count">{length} items left</div>
            <div className="filter">
              <button  
                onClick={this.allTask}
                className={this.state.borderButton === "all" ? "button2" : "button"}>
                All
              </button>
              <button className={this.state.borderButton === "active" ? "button2" : "button"} onClick={this.filterUnDone}>
                Active
              </button>
              <button className={this.state.borderButton === "completed" ? "button2" : "button"} onClick={this.filterDone}>
                Completed
              </button>
            </div>
            <div className="clear">
              <button className={this.state.borderButton === "clear" ? "button2" : "button"} onClick={this.allClear}>
                Clear completed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
