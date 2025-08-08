import React, { useState, useEffect } from 'react'
import { Button, Input, List, Checkbox, Space, Typography, message } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Item } from '../entities/Item'

const { Title } = Typography

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    setLoading(true)
    try {
      const response = await Item.list()
      if (response.success) {
        setTodos(response.data)
      }
    } catch (error) {
      message.error('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async () => {
    if (!newTodo.trim()) return

    try {
      const response = await Item.create({
        title: newTodo.trim(),
        completed: false
      })

      if (response.success) {
        setTodos([...todos, response.data])
        setNewTodo('')
        message.success('Todo added successfully!')
      }
    } catch (error) {
      message.error('Failed to add todo')
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const response = await Item.update(id, { completed })
      
      if (response.success) {
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, completed } : todo
        ))
      }
    } catch (error) {
      message.error('Failed to update todo')
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await Item.delete(id)
      
      if (response.success) {
        setTodos(todos.filter(todo => todo._id !== id))
        message.success('Todo deleted successfully!')
      }
    } catch (error) {
      message.error('Failed to delete todo')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Title level={2} className="text-center mb-8 text-amber-900">
          📝 My To-Do List
        </Title>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Space.Compact style={{ width: '100%' }} className="mb-4">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              size="large"
              className="rounded-l-md"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addTodo}
              size="large"
              className="bg-amber-600 hover:bg-amber-700 border-amber-600 rounded-r-md"
              disabled={!newTodo.trim()}
            >
              Add
            </Button>
          </Space.Compact>

          <List
            loading={loading}
            dataSource={todos}
            locale={{ emptyText: 'No todos yet! Add one above.' }}
            renderItem={(todo) => (
              <List.Item
                className={`border-b border-gray-100 py-3 ${todo.completed ? 'opacity-60' : ''}`}
                actions={[
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  />
                ]}
              >
                <Space align="start" className="w-full">
                  <Checkbox
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo._id, e.target.checked)}
                  />
                  <span 
                    className={`${
                      todo.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>
                </Space>
              </List.Item>
            )}
          />
        </div>

        <div className="text-center text-amber-700">
          <p className="text-sm">
            {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
          </p>
        </div>
      </div>
    </div>
  )
}

export default TodoApp