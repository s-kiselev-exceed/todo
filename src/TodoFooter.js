import React from "react";
import "react-toastify/dist/ReactToastify.css";

class TodoFooter extends React.Component {
  render() {
    const length = this.props.list.filter(item => item.checked === false)
      .length;
    return (
      <div className="footer">
        <div>{length} items left</div>
        <div className="filters">
          <button
            onClick={this.props.allTask}
            className={this.props.status === "all" ? "button-on" : "button-off"}
          >
            All
          </button>
          <button
            className={
              this.props.status === "active" ? "button-on" : "button-off"
            }
            onClick={this.props.filterUnDone}
          >
            Active
          </button>
          <button
            className={
              this.props.status === "done" ? "button-on" : "button-off"
            }
            onClick={this.props.filterDone}
          >
            Completed
          </button>
        </div>
        <div className="clear">
          <button className="button-off" onClick={this.props.allClear}>
            Clear completed
          </button>
        </div>
      </div>
    );
  }
}

export default TodoFooter;
