import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

class TodoApp extends React.Component {
  state = {
    list: [],
    status: "all",
    switcher: false,
    lengthArray: []
  };

  //Add array
  onAdd = data => {
    const newItem = [data, ...this.state.list];
    this.setState({ list: newItem });
    console.log(data);
  };
  //delete 1 item
  removeItem = id => {
    const newArray = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newArray });
  };

  checkItem = param => {
    const newId = this.state.list.map(item => {
      if (item.id === param) {
        item.checked = !item.checked;
      }
      return item;
    });
    this.setState({ list: newId });
    console.log(param);
  };
  //clear all done
  allClear = () => {
    const newAr = this.state.list.filter(item => item.checked === false);
    this.setState({ list: newAr });
  };

  //This checked method
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

  // filter done
  filterDone = () => {
    this.setState({ status: "done" });
  };
  // filter undone
  filterUnDone = () => {
    this.setState({ status: "active" });
  };
  // filter all
  allTask = () => {
    this.setState({ status: "all" });
  };

  itemsLeft = () => {
    const newId = this.state.list.filter(item => item.checked === true).length;
    console.log(newId);
  };

  render() {
    const length = this.state.list.filter(item => item.checked === true).length;
    return (
      <div>
        <h1 className="todos">todos</h1>

        <div className="marg">
          <TodoForm
            itemsLeft={this.itemsLeft}
            onAdd={this.onAdd}
            allChecked={this.allChecked}
            filterDone={this.filterDone}
            filterUnDone={this.filterUnDone}
            allTask={this.allTask}
          />
          <TodoList
            itemsLeft={this.itemsLeft}
            list={this.state.list}
            status={this.state.status}
            removeItem={this.removeItem}
            checkItem={this.checkItem}
            taskChange={this.taskChange}
          />
          <div className="footer">
            <div className="count">{length} items left</div>
            <div className="filter">
              <button className="btn" onClick={this.allTask}>
                All
              </button>
              <button className="btn" onClick={this.filterUnDone}>
                Active
              </button>
              <button className="btn" onClick={this.filterDone}>
                Completed
              </button>
            </div>
            <div className="clear">
              <button className="btn" onClick={this.allClear}>
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
