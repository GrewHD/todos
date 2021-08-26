import React, {useContext, useState} from 'react'

import Context from "../../../context";

import classNames from 'classnames/bind';
import styles from './Todo.module.css';

import deleteImg from './img/delete.png';
import editImg from './img/edit.png';
import submitImg from './img/submit.png';
import cancelImg from './img/cancel.png';

let cx = classNames.bind(styles);

function Todo(props){
    const [isOpen, setOpen] = useState(false)
    const [description, setDescription] = useState(props.todo.description)

    const { todoDelete, todoChange, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler} = useContext(Context)


    let className = cx({
        todoInfo: true,
        done: props.todo.done
    });

    function todoChangeSubmitHandler(id, description) {
        props.todoChangeSubmit(id, description)
        setOpen(false)
        setDescription(props.todo.description)
    }

    function todoChangeCancelHandler(){
        setOpen(false)
        setDescription(props.todo.description)
    }


    return (
        <li className={styles.todo}
            draggable={true}
            onDragStart={e => dragStartHandler(e, props.todo)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, props.todo)}
        >
            {isOpen ? (
                <React.Fragment>
                    <span className={styles.todoInfo}>
                        <input value={description} onChange={event => {setDescription(event.target.value)}}/>
                    </span>
                    <span className={styles.buttonsBlock}>
                        <button onClick={() => todoChangeSubmitHandler(props.todo.id, description)}
                                className={styles.submitButton}>
                            <img src={submitImg} alt="submit"/>
                        </button>
                        <button onClick={() => todoChangeCancelHandler()}
                                className={styles.cancelButton}>
                            <img src={cancelImg} alt="cancel"/>
                        </button>
                    </span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span className={className}>
                        <input type={"checkbox"} onChange={() => props.todoChangeStatus(props.todo.id)} className={styles.checkbox}/>
                        <p className={styles.description}><b>{props.todo.order +"."}</b> {props.todo.description}</p>
                    </span>
                    <span className={styles.buttonsBlock}>
                        <button onClick={() => setOpen(true)}
                                className={styles.changeButton}>
                            <img src={editImg} alt="edit" />
                        </button>
                        <button onClick={() => todoDelete(props.todo.id, props.todo.order)}
                                className={styles.deleteButton} >
                            <img src={deleteImg} alt="delete" />
                        </button>
                    </span>
                </React.Fragment>
            )}
        </li>
    );
}

export default Todo