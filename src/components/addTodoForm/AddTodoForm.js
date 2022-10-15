import React from 'react';
import { useState } from 'react';
import './AddTodoForm.css';
import { IoMdAdd } from "react-icons/io";


const AddTodoForm = ( {addNewTodo} ) => {

    const [addTodo, setAddTodo] = useState('');

    const handleTodo = (e) => {
        e.preventDefault()
        addNewTodo(addTodo)
        setAddTodo('')
    }


    
   
    return (
        <div>
            <div className="container">
                <h1 className='todo-header'>Abdoul's Todo</h1>
                <form className='todo-form' onSubmit={handleTodo}>
                    <input className='todo-input'
                        type="text" value={addTodo}
                        onChange={(e) => setAddTodo(e.target.value)}
                        required 
                        placeholder="✍🏿 Add Task"
                    />
                    <button type='submit' className='submit-btn'><IoMdAdd className='submit-icon'/></button>
                </form>
            </div>
        </div>
    );
};

export default AddTodoForm;