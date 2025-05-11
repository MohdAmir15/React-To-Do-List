import React, { use, useEffect } from 'react'
import './CSS/ToDo.css' // Importing React and CSS for styling
import { useState, useRef } from 'react'; // Importing useState and useRef hooks from React
import ToDoItems from './ToDoItems';

let count = 0;

const ToDo = () => {
  const [todos, setTodos] = useState([]); // State to hold the list of tasks
  const inputRef = useRef(null); // Ref to access the input field directly

  // Function to handle adding a new task
  const add = () => {
    setTodos([...todos, {no: count++, text: inputRef.current.value, display: ""}]); // Add the new task to the list
    inputRef.current.value = ""; // Clear the input field
    localStorage.setItem("todos_count", count) // Store the current count in local storage
  }

  // Retrieve tasks from local storage on component mount
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos"))); 
    count = localStorage.getItem("todos_count") // Retrieve the current count from local storage
  },[])

  //display
  useEffect(() => {
    // setTimeout to update the tasks in local storage after 1 second
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos)); // Store the tasks in local storage
    }, 1000);

  }, [todos]) // Effect to run when the todos state changes

  return (
    <div className='todo'>
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
        <div onClick={() => {add()}} className="todo-add-btn">Add</div>
      </div>

      {/* Display the list of tasks */}
      <div className="todo-list">
        {todos.map((item, index) => {
           return <ToDoItems key={index} setTodos={setTodos} no = {item.no} display = {item.display} text = {item.text} /> // Pass the task details to the ToDoItems component
        })}
      </div>

    </div>
  )
}

export default ToDo