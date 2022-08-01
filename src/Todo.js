import React from 'react'

import { Checkbox } from '@chakra-ui/react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <Checkbox my={1} checked={todo.complete} onChange={handleTodoClick}>
                    {todo.name}
                </Checkbox>
            </label>
        </div>
    )
}
