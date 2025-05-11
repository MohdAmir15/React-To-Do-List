import React from 'react'
import './CSS/ToDoItems.css'
// Importing React and CSS for styling
import tick from './Assets/tick.png'
import cross from './Assets/cross.png'
import not_tick from './Assets/not_tick.png'


const ToDoItems = ({no, display, text, setTodos}) => {

  const deleteTodo = (no) => {
    // Function to delete a task
    let data = JSON.parse(localStorage.getItem("todos")); // Retrieve tasks from local storage
    data = data.filter((todo) => todo.no !== no); // Filter out the task to be deleted
    setTodos(data); // Update the todos state
    localStorage.setItem("todos", JSON.stringify(data)); // Store the updated tasks in local storage
  }

  const toggle = () => {
    // Function to toggle the display state of the task
    let data = JSON.parse(localStorage.getItem("todos"));
    
    // Update the display state of the task in local storage
    for(let i=0; i<data.length; i++){
      if(data[i].no === no){
        if(data[i].display === ""){ 
          data[i].display = "line-through";
        }else{
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data); // Update the todos state
  }

  return (
    <div className='todoitems'>
      <div className={`todoitems-container ${display}`} onClick={()=>{toggle(no)}}>
        {display === ""?<img src={not_tick} alt="" />:<img src={tick} alt="" />} {/* Display tick or cross icon based on the display prop */}
        <div className="todoitems-text">{text}</div>
      </div>
      <img className='todoitems-cross-icon' onClick={()=> {deleteTodo(no)}} src={cross} alt="" />
    </div>
  )
}

export default ToDoItems