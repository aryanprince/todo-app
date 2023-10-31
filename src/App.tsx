import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoListFunc from './TodoList'

import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Container,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { FaCheck, FaPlus } from 'react-icons/fa'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

type Todo = {
  name: string
  isCompleted: boolean
  id: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const todoNameRef = useRef<HTMLInputElement>()

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    )
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id: string) {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.isCompleted = !todo.isCompleted
    console.log(todo)
    setTodos(newTodos)
  }

  function handleAddTodo(e: any) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, isCompleted: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.isCompleted)
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
                  Designed with{' '}
                  <Link href="https://chakra-ui.com/">Chakra UI.</Link> Built by{' '}
                  <Link href="https://github.com/aryanprince">
                    Aryan Prince.
                  </Link>
                </Text>
              </Box>
            </Box>
            <Box>
              {/* INPUT FIELD */}
              <Box my={2} w="88%" maxW="500px">
                <Input
                  variant="filled"
                  ref={todoNameRef}
                  placeholder="Type in your taks here..."
                />
              </Box>

              {/* BUTTONS */}
              <Box my={4}>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={handleAddTodo}
                >
                  Add new
                </Button>
                <Button
                  ml={2}
                  leftIcon={<FaCheck />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleClearTodos}
                >
                  Clear completed
                </Button>
              </Box>
            </Box>

            {/* TODOS + BADGE */}
            <Box>
              <TodoListFunc todos={todos} toggleTodo={toggleTodo} />
              <Box>
                <Badge fontSize="lg" mt={4}>
                  {todos.filter((todo) => !todo.isCompleted).length} left to do
                  today
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
