import React, { useState, useRef, useEffect } from 'react'
import TodoListFunc from './TodoList'
import { v4 as uuidv4 } from 'uuid'

import { ChakraProvider, Button, Input, Heading, Text, Badge } from '@chakra-ui/react'

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
            <ChakraProvider>
                <div>
                    <div>
                        <Heading ml={5} my={4}>
                            Todo List
                        </Heading>
                    </div>
                    <div>
                        <div>
                            <Input
                                ml={5}
                                my={2}
                                w="90%"
                                maxW="500px"
                                variant="filled"
                                ref={todoNameRef}
                                placeholder="Type in your taks here..."
                                type="text"
                            />
                        </div>
                        <div>
                            <Button
                                ml={5}
                                mt={3}
                                mb={4}
                                colorScheme="teal"
                                variant="solid"
                                onClick={handleAddTodo}
                            >
                                Add new
                            </Button>
                            <Button
                                ml={2}
                                mt={3}
                                mb={4}
                                colorScheme="teal"
                                variant="outline"
                                onClick={handleClearTodos}
                            >
                                Clear completed
                            </Button>
                        </div>
                    </div>
                    <div>
                        <TodoListFunc todos={todos} toggleTodo={toggleTodo} />
                        <div>
                            <Badge fontSize="lg" ml={5} mt={4}>
                                {todos.filter((todo) => !todo.complete).length} left to do
                                today
                            </Badge>
                        </div>
                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}

export default App
