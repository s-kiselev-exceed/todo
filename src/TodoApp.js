import React from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class TodoApp extends React.Component {
  state = {
    list: [],
    status: "all",
    switcher: true,
    lengthArray: [],
    borderButton: "okey"
  };

  //Add item
  onAdd = data => {
    axios
      .post("http://localhost:1234/items/create", data)
      .then(res => {
        const newItem = [...this.state.list, res.data];
        this.setState({ list: newItem });
        toast("Task Added!");
      })
      .catch(err => console.log(err));
  };

  //Change item
  onEdit = (param) => {
    console.log(param);
    axios
      .put(`http://localhost:1234/items/change-item/${param.id}`,{update:{text: param.text}})
      .then(res => {
        console.log(res)
        const newItem = this.state.list.map(data => {
          return { ...data, text: res.data.text };
        });
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  //Get all items from DB
  componentDidMount() {
    axios
      .get(`http://localhost:1234/items`)
      .then(res => {
        const newItem = res.data;
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  }

  //Delete item
  removeItem = id => {
    const newArray = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newArray });
  };

  //Check item
  checkItem = (param) => {
    console.log(param.id,'+++',param.checked);
    axios
      .put(`http://localhost:1234/items/change-item/${param.id}`,{
        update:{checked: !param.checked}
      })
      .then(res => {
        console.log(res);
        const newItem = this.state.list.map(item => {
          if (param.id === item._id) {
            return { ...item, checked: !res.data.checked };
          }
          return item;
        });
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  // Check all items
  checkAllItems = item => {
    axios
      .put(`http://localhost:1234/items/update-checkbox`, item)
      .then(res => {
        console.log(res.data[0].checked);
        const newArr = this.state.list.map(elem => {
          return { ...elem, checked: res.data[0].checked };
        });
        this.setState({ switcher: !this.state.switcher, list: newArr });
      })
      .catch(err => console.log(err));
  };

  //Clear all done item
  allClear = () => {
    axios
      .delete("http://localhost:1234/items/remove")
      .then(res => {
        console.log(res.data);
        const newAr = this.state.list.filter(item => 
          item.checked === res.data[0].checked
        );
        this.setState({ list: newAr, borderButton: "clear" });
        toast("Tasks Cleared!");
      })
      .catch(err => console.log(err));
  };

  // Filter for done items
  filterDone = () => {
    toast("Completed Tasks list!");
    this.setState({ status: "done", borderButton: "completed" });
  };

  // Filter for undone items
  filterUnDone = () => {
    toast("Active Tasks list!");
    this.setState({ status: "active", borderButton: "active" });
  };

  // Filter for all items
  allTask = () => {
    toast("All Tasks list!");
    this.setState({ status: "all", borderButton: "all" });
  };
  render() {
    const length = this.state.list.filter(item => item.checked === false)
      .length;
    return (
      <div>
        <h1 className="todos">todos</h1>
        <div className="marg">
          <TodoForm
            onAdd={this.onAdd}
            checkAllItems={this.checkAllItems}
            switcherCheck={this.state.switcher}
          />
          <TodoList
            itemsLeft={this.itemsLeft}
            list={this.state.list}
            status={this.state.status}
            removeItem={this.removeItem}
            checkItem={this.checkItem}
            taskChange={this.taskChange}
            onAdd={this.onAdd}
            onEdit={this.onEdit}
          />
          <ToastContainer />
          <div className="footer">
            <div>{length} items left</div>
            <div className="filter">
              <button
                onClick={this.allTask}
                className={
                  this.state.borderButton === "all" ? "buttonOn" : "buttonOff"
                }
              >
                All
              </button>
              <button
                className={
                  this.state.borderButton === "active"
                    ? "buttonOn"
                    : "buttonOff"
                }
                onClick={this.filterUnDone}
              >
                Active
              </button>
              <button
                className={
                  this.state.borderButton === "completed"
                    ? "buttonOn"
                    : "buttonOff"
                }
                onClick={this.filterDone}
              >
                Completed
              </button>
            </div>
            <div className="clear">
              <button
                className={
                  this.state.borderButton === "clear" ? "buttonOn" : "buttonOff"
                }
                onClick={this.allClear}
              >
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
