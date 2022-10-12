import React, { useState } from 'react';
import AddTodoForm from '../addTodoForm/AddTodoForm';
import { v4 as uuidv4 } from 'uuid';
import './Todos.css'
import { MdRemoveCircle } from "react-icons/md";
import { ImSad2, ImCheckboxUnchecked,  ImCheckboxChecked} from "react-icons/im";


const Todos = () => {

    const [todos, setTodos] = useState([
        // {id: uuidv4(), todoText: 'hello todo', done: false},
        // {id: uuidv4(), todoText: 'hello alreadey done', done: true},
    ])
    

    const todoItem = todos.map((todo) => {

        


        // The delete todo handler
        const deleteHandler = () => {
            setTodos(todos.filter((el) => el.id !== todo.id))
        }

        // The todo completion handler
        const handleCompletion = () => {
            setTodos(todos.map((item) => {

                if(item.id === todo.id) {
                    return {...item, done: !item.done}
                } return item
            }))
        }

        // checking if it's completed to put the right icon
        const isTodoDone = todo.done ?
        <ImCheckboxChecked className='check-icon' onClick={handleCompletion} /> 
        : 
        <ImCheckboxUnchecked className='check-icon' onClick={handleCompletion}/>;

        

        return  (
                
                <div className={`todo-wrapper ${todo.done && 'completed'}`} key={todo.id} completion={todo.done.toString()}>
                    {isTodoDone}
                    <p className="todo-text">{todo.todoText}</p>
                    <MdRemoveCircle className='remove' onClick={deleteHandler}/>
                </div>
        )
    })


    // Seperating Todos and Completed

    const toBeDone = todoItem.filter((el) => {
        // console.log(el.props.completion)
        return (
            el.props.completion === "false"
        )
    })

    const completed = todoItem.filter((el) => {
        // console.log(el.props.completion)
        return (
            el.props.completion === "true"
        )
    })
    
    const addNewTodo = (newTodo) => {
        setTodos([...todos, {
            id: uuidv4(),
            todoText: newTodo,
            done: false
        }])
    }


    return (

        <div>
            <AddTodoForm addNewTodo={addNewTodo} />
            {
               todos.length > 0 ?
                <div className="todos">
               
                    <div className="to-be-done">
                        <h2>To do ({toBeDone.length}) </h2>
                        {toBeDone}
                    </div>


                    <div className="completed-todos">
                        <h2>Completed ({completed.length})</h2>
                        {completed}
                    </div>
                </div> 
                :

                <h3 className='nothong-to-do'><span>Nothing to do? - Your life sucks!</span> <ImSad2 /> </h3>
            }

    
        </div>
    );
};

export default Todos;