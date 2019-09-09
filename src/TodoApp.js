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
    switcher: false,
    lengthArray: [],
    borderButton: "okey"
  };

  //Add array
  onAdd = data => {
    axios
      .post("http://localhost:1235/users/create", data)
      .then(res => {
        const newItem = [...this.state.list, res.data];
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  onEdit = obj => {
    axios
      .put(`http://localhost:1235/users/update/task/${obj.id}`, obj)
      .then(res => {
        const newItem = this.state.list.map(data => {
          if (obj.id === data.id) {
            data.text = obj.text;
          }
          return data;
        });
        this.setState({ list: newItem });
      })
      .catch(err => console.log(err));
  };

  //Get all tasks from DB
  componentDidMount() {
    axios.get(`http://localhost:1235/users`).then(res => {
      const newItem = res.data;
      this.setState({ list: newItem });
    });
  }

  //Delete item
  removeItem = id => {
    const newArray = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newArray });
  };
  //Checked item
  checkItem = param => {
    axios
      .put(`http://localhost:1235/users//update-check/${param.id}`, param)
      .then(res => {
        const newId = this.state.list.map(item => {
          if (param.id === item._id) {
            item.checked = !item.checked;
          }
          return item;
        });
        this.setState({ list: newId });
      })
      .catch(err => console.log(err));
  };

  //Clear all done
  allClear = () => {
    axios
      .delete("http://localhost:1235/users/remove")
      .then(res => {
        const newAr = this.state.list.filter(item => item.checked === false);
        this.setState({ list: newAr, borderButton: "clear" });
        toast("Tasks Cleared!");
      })
      .catch(err => console.log(err));
  };

  //Checked all items
   /* allChecked = () => {
    const newArr = this.state.list.map(item => {
      if (this.state.switcher === false) {
        axios.put(`http://localhost:1235/users/update`)
          .then(res => {
            item.checked = true;
            this.setState({ switcher: true });
          })
          .catch(err => console.log(err));
      } else {
        axios.put(`http://localhost:1235/users/downdate`)
          .then(res => {
            item.checked = false;
            this.setState({ switcher: false });
          })
          .catch(err => console.log(err));
      }
      return item;
    });
    this.setState({ list: newArr });
  };
  */
  //============================

  allChecked = item => {
    console.log(item,'item')
    const { list } = this.state;
    if (this.state.switcher === false) {
      axios.put(`http://localhost:1235/users/update`,).then(res => {
        console.log(res)
        const newArray = [...list].map(item => {
          item.checked = true;
        });

        // this.setState({ switcher: true });
      });
    } else {
      // axios.put(`http://localhost:1235/users/downdate`).then(res => {
      //   this.state.list.map(item => {
      //     item.checked = false;
      //     this.setState({ switcher: false });
      //   });
      // });
    }
    return item;
  };

  //========================================

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
    console.log(this.state.list)
    const length = this.state.list.filter(item => item.checked === false)
      .length;
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
