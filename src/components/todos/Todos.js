import React, { useState, useEffect } from "react";
import AddTodoForm from "../addTodoForm/AddTodoForm";
import { v4 as uuidv4 } from "uuid";
import "./Todos.css";
import { MdRemoveCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ImSad2, ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [filterSelect, setFilterSelect] = useState("all-tasks");

  useEffect(() => {
    getLocalTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveLocalTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  useEffect(() => {
    todosToDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelect]);

  //

  const todoItem = todos.map((todo) => {
    // The delete todo handler
    const deleteHandler = () => {
      setTodos(todos.filter((el) => el.id !== todo.id));
    };

    // The todo completion handler
    const handleCompletion = () => {
      setTodos(
        todos.map((item) => {
          if (item.id === todo.id) {
            return { ...item, done: !item.done };
          }
          return item;
        })
      );
    };

    // checking if it's completed to put the right icon
    const isTodoDone = todo.done ? (
      <ImCheckboxChecked className="check-icon" onClick={handleCompletion} />
    ) : (
      <ImCheckboxUnchecked className="check-icon" onClick={handleCompletion} />
    );

    return (
      <div
        className={`todo-wrapper ${todo.done && "completed"}`}
        key={todo.id}
        completion={todo.done.toString()}
      >
        {isTodoDone}
        <p className="todo-text">{todo.todoText}</p>
        <BiEdit className="edit" />
        <MdRemoveCircle className="remove" onClick={deleteHandler} />
      </div>
    );
  });

  // Seperating Todos and Completed

  const toBeDone = todoItem.filter((el) => {
    return el.props.completion === "false";
  });

  const completed = todoItem.filter((el) => {
    return el.props.completion === "true";
  });

  // adding new todo
  const addNewTodo = (newTodo) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todoText: newTodo,
        done: false,
        editable: false,
      },
    ]);
  };

  // Saving data to the browser local starage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  };

  const todosToDisplay = () => {
    if (filterSelect === "completed") {
      return completed;
    } else if (filterSelect === "tasks") {
      return toBeDone;
    } else {
      return todoItem;
    }
  };

  const emptyHandler = () => {
    if ((filterSelect === "completed") & (completed.length < 1)) {
      return <p>No task completed yet</p>;
    } else if ((filterSelect === "tasks") & (toBeDone.length < 1)) {
      return <p>You've completed all your tasks !</p>;
    } else {
      return "";
    }
  };

  return (
    <div className="todos-container">
      <AddTodoForm addNewTodo={addNewTodo} />

      {todos.length > 0 ? (
        <div className="todos">
          <div className="tasks">
            <h2>
              All task{todoItem.length > 1 && "s"}: {todoItem.length}
            </h2>
            <div className="filter-options-wrapper">
              <span>Filtrer:</span>

              <select
                name="statuts"
                className="filter-selecter"
                onChange={(e) => {
                  setFilterSelect(e.target.value);
                }}
              >
                <option value="all-tasks">All-tasks</option>
                <option value="tasks">Todos</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {todosToDisplay()}
            {emptyHandler()}
          </div>
        </div>
      ) : (
        <h3 className="nothing-to-do">
          <span>Nothing to do? - Your life sucks!</span> <ImSad2 />{" "}
        </h3>
      )}
    </div>
  );
};

export default Todos;
