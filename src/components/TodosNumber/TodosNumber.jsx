import React from 'react'

import styles from "./TodosNumber.module.css"

function TodosNumber(props) {
    function getDoneTodosNumber(todos) {
        let done = 0
        todos.forEach((todo) => {
            if (todo.done === true) done++
        })
        return done
    }

    return (
        <div className={styles.todosDone}>
            <p>{getDoneTodosNumber(props.todos)} / {props.todos.length}</p>
            {
                props.todos.every(todo => todo.done === true)
                && getDoneTodosNumber(props.todos) !== 0
                && <p><b>All done!</b></p>
            }
            {
                props.todos.length == 0 ? <p><b>No todos!</b></p> : null
            }
        </div>
    )
}

export default TodosNumber