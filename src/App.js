import './App.css';
import {useState} from "react";
import { v4 as uuid } from 'uuid';
import TodoList from "./views/TodoList";
import AddTodo from "./views/AddTodo";
import TodosNumber from "./components/TodosNumber";
import Context from "./context";

function App() {
  const [todos, setTodos] = useState([
      {id: uuid(), order: 1, description: "Buy milk", done: false},
      {id: uuid(), order: 2, description: "Buy bread", done: false},
  ])

  const [currentTodo, setCurrentTodo] = useState(null)

  function todoChangeStatus(id) {
    setTodos(
        todos.map(todo => {
            if (todo.id === id) {
                todo.done = !todo.done
            }
        return todo
        })
    )
  }

  function todoDelete(id, order) {
      setTodos(todos
          .filter(todo => todo.id !== id)
          .map(todo => {
              if (todo.order > order) {
                  todo.order--
              }
              return todo
          })
      )
  }

  function todoAdd(description) {
    setTodos(todos.concat([{
        id: uuid(),
        order: todos.length + 1,
        description,
        done: false,
    }]))
  }

  function todoChangeSubmit(id, value) {
    setTodos(
        todos.map(todo => {
            if (todo.id === id) {
                todo.description = value
            }
        return todo
        })
    )
  }

    function dragStartHandler(e, todo) {
        setCurrentTodo(todo)
    }

    function dragEndHandler(e) {
        return undefined;
    }

    function dragOverHandler(e) {
        e.preventDefault()
    }

    function dropHandler(e, todo) {
        e.preventDefault()
        setTodos(todos.map(t => {
            if (t.id === todo.id) {
                return {...t, order: currentTodo.order}
            }
            if (t.id === currentTodo.id) {
                return {...t, order: todo.order}
            }
            return t
        }))
    }

    function sortTodos (firstTodo, secondTodo) {
      if (firstTodo.order > secondTodo.order) {
          return 1
      } else {
          return -1
      }
    }

  return (
      <Context.Provider value={{todoDelete, todoChangeStatus, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler}}>
        <div className={"wrapper"}>
            <div className={"body"}>
                <AddTodo onCreate={todoAdd}/>
                <TodosNumber todos={todos} className={"todosNumber"}/>
                {todos.length ? <TodoList todos = {todos} todoChangeStatus = {todoChangeStatus} todoChangeSubmit={todoChangeSubmit} sortTodos={sortTodos}/> : null}
            </div>
        </div>
      </Context.Provider>
  );
}

export default App;
