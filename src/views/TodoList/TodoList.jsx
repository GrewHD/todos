import React from 'react'

import styles from "./TodoList.module.css"

import Todo from "./components/Todo"

function TodoList(props){
    return (
        <ul className={styles.todoList}>
            {props.todos.sort(props.sortTodos).map( todo => {
              return  <Todo todo={todo} key={todo.id} todoChangeStatus={props.todoChangeStatus} todoChangeSubmit={props.todoChangeSubmit}/>
            })}
        </ul>
    );
}

export default TodoList