import React, { useState, useRef, useEffect } from 'react'
import TodoListFunc from './TodoList'
import { v4 as uuidv4 } from 'uuid'

import { ChakraProvider, Button, Input, Heading, Text, Badge, Box, Container, Link } from '@chakra-ui/react'
import { FaPlus, FaCheck } from 'react-icons/fa'

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
                <Container maxW="xl" p="5" mt={[0, 0, 5]}>
                    <Box ml={[1, 3, 5]}>
                        <Box my={4}>
                            <Heading>Todo List</Heading>
                            <Box fontSize="sm" as="i">
                                <Text>A simple todo app utilizing local storage.</Text>
                                <Text>
                                    Designed with <Link href="https://chakra-ui.com/">Chakra UI.</Link> Built by <Link href="https://github.com/aryanprince">Aryan Prince.</Link>
                                </Text>
                            </Box>
                        </Box>
                        <Box>
                            {/* INPUT FIELD */}
                            <Box my={2} w="88%" maxW="500px">
                                <Input variant="filled" ref={todoNameRef} placeholder="Type in your taks here..." />
                            </Box>

                            {/* BUTTONS */}
                            <Box my={4}>
                                <Button leftIcon={<FaPlus />} colorScheme="teal" variant="solid" onClick={handleAddTodo}>
                                    Add new
                                </Button>
                                <Button ml={2} leftIcon={<FaCheck />} colorScheme="teal" variant="outline" onClick={handleClearTodos}>
                                    Clear completed
                                </Button>
                            </Box>
                        </Box>

                        {/* TODOS + BADGE */}
                        <Box>
                            <TodoListFunc todos={todos} toggleTodo={toggleTodo} />
                            <Box>
                                <Badge fontSize="lg" mt={4}>
                                    {todos.filter((todo) => !todo.complete).length} left to do today
                                </Badge>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ChakraProvider>
        </>
    )
}

export default App
