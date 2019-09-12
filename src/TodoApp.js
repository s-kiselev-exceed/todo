import React from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoFooter from "./TodoFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class TodoApp extends React.Component {
  state = {
    list: [],
    status: "all",
    switcher: true
  };

  //Add item
  onAdd = data => {
    axios
      .post("http://localhost:1235/items/create", data)
      .then(res => {
        const newItem = [...this.state.list, res.data];
        this.setState({ list: newItem });
        toast("Task Added!");
      })
      .catch(err => console.log(err));
  };

  //Change item
  onEdit = obj => {
    axios
      .put(`http://localhost:1235/items/change-item/${obj.id}`, {
        update: { text: obj.text }
      })
      .then(res => {
        console.log(res);
        const newItem = this.state.list.map(data => {
          if (obj.id === data._id) {
            return { ...data, text: res.data.text }; //res.data.text-old value
          }
          return data;
        });
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  //Get all items from DB
  componentDidMount() {
    axios
      .get(`http://localhost:1235/items`)
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
  checkItem = obj => {
    console.log(obj);
    axios
      .put(`http://localhost:1235/items/change-item/${obj.id}`, {
        update: { checked: !obj.checked }
      })
      .then(res => {
        const newItem = this.state.list.map(item => {
          if (obj.id === item._id) {
            return { ...item, checked: res.data.checked };
          }
          return item;
        });
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  // Check all items
  checkAllItems = checked => {
    axios
      .put(`http://localhost:1235/items/check-all-items`, checked)
      .then(res => {
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
      .delete("http://localhost:1235/items/delete-done-items")
      .then(res => {
        const newAr = this.state.list.filter(item =>
          res.data.length === 0
            ? item.checked === false
            : item.checked === res.data[0].checked
        );
        this.setState({ list: newAr, borderButton: "clear" });
        toast("Tasks Cleared!");
      })
      .catch(err => console.log(err));
  };

  // Clear all done items (Test)
  // allClear = (event) => {
  //   console.log(event)
  //   axios
  //     .delete("http://localhost:1235/items/test", {
  //       update: { checked: event }
  //     })
  //     .then(res => {
  //       const newAr = this.state.list.filter(item =>
  //         res.data.length === 0
  //           ? item.checked === false
  //           : item.checked === res.data[0].checked
  //       );
  //       this.setState({ list: newAr, borderButton: "clear" });
  //       toast("Tasks Cleared!");
  //     })
  //     .catch(err => console.log(err));
  // };

  // Filter for done items
  filterDone = () => {
    this.setState({ status: "done" });
    toast("Completed Tasks list!");
  };

  // Filter for undone items
  filterUnDone = () => {
    this.setState({ status: "active" });
    toast("Active Tasks list!");
  };

  // Filter for all items
  allTask = () => {
    this.setState({ status: "all" });
    toast("All Tasks list!");
  };
  render() {
    return (
      <div>
        <h1 className="todos-header">todos</h1>
        <div className="style-components">
          <TodoForm
            onAdd={this.onAdd}
            checkAllItems={this.checkAllItems}
            switcher={this.state.switcher}
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
          <TodoFooter
            list={this.state.list}
            status={this.state.status}
            allTask={this.allTask}
            filterUnDone={this.filterUnDone}
            filterDone={this.filterDone}
            allClear={this.allClear}
          />
        </div>
      </div>
    );
  }
}

export default TodoApp;
