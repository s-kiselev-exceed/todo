import React from "react";
class TodoForm extends React.Component {

 state = {
   name: ""
 };

 onBtnClickHandler = e => {
   e.preventDefault();
   const { name } = this.state;
   this.props.onAdd({
     id: +new Date(),
     text: name,
     checked : false,
   });
 };
 
 handleChange = e => {
   const { id } = e.currentTarget;
   this.setState({ [id]: e.currentTarget.value },
     );
   };

 render() {
   const { name } = this.state;
   return (
  //   <form >
       <React.Fragment >
         <button className="input" onClick={this.props.allCheck}>^</button>
       <input className="input"
       readOnly={false}
         id="name"
         type="text"
         onChange={this.handleChange}
         placeholder="What needs to be done?"
         value={name}/>
       <button className="input" onClick={this.onBtnClickHandler}>
         Click
       </button>
       </React.Fragment>
  //   </form>
   );
 }
}
export default TodoForm;
