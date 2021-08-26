import React, {useState} from "react";

function AddTodo(props) {
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()

        if (value.trim()) {
            props.onCreate(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={submitHandler}>
             <input value={value} onChange={event => setValue(event.target.value) }/>
             <button type={"submit"}>Submit</button>
        </form>
    )
}

export default AddTodo;