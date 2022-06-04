import React, { useState, useRef, useEffect } from 'react'
import TodoListFunc from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find((todo) => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })
        todoNameRef.current.value = null
    }

    function handleClearTodos() {
        const newTodos = todos.filter((todo) => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <>
            <div className="container">
                <div className="row m-3">
                    <div className="col">
                        <input ref={todoNameRef} type="text" />
                    </div>
                    <div className="col">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary" onClick={handleAddTodo}>
                                Add new
                            </button>
                            <button type="button" class="btn btn-danger" onClick={handleClearTodos}>
                                Clear completed
                            </button>
                        </div>
                    </div>
                    <TodoListFunc todos={todos} toggleTodo={toggleTodo} />
                    <div>{todos.filter((todo) => !todo.complete).length} left to do today</div>
                </div>
            </div>
        </>
    )
}

export default App
