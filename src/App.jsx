import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import Dashboard from './pages/Dashboard'

// Sample data for responsible persons (as per project spec)
const SAMPLE_PERSONS = [
  {id: '1', name: 'Alice Johnson'},
  {id: '2', name: 'Bob Smith'},
  {id: '3', name: 'Carol Davis'},
  {id: '4', name: 'Dave Wilson'},
  {id: '5', name: 'Eve Taylor'},
]

function App() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [persons, setPersons] = useState(SAMPLE_PERSONS)

  // Initialize from LocalStorage or set defaults
  useEffect(() => {
    const storedTasks = localStorage.getItem('kanban-tasks')
    const storedCategories = localStorage.getItem('kanban-categories')
    
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      // Set default categories if none exist
      setCategories([
        {id: 'work', name: 'Work'},
        {id: 'personal', name: 'Personal'},
        {id: 'urgent', name: 'Urgent'},
        {id: 'study', name: 'Study'},
      ])
      localStorage.setItem('kanban-categories', JSON.stringify([
        {id: 'work', name: 'Work'},
        {id: 'personal', name: 'Personal'},
        {id: 'urgent', name: 'Urgent'},
        {id: 'study', name: 'Study'},
      ]))
    }
    
    // Ensure persons are stored
    localStorage.setItem('kanban-persons', JSON.stringify(SAMPLE_PERSONS))
  }, [])

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (task) => {
    setTasks(tasks.map((t) => t.id === task.id ? task : t))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const moveTask = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      const updatedTask = {...task, status: newStatus}
      // If moving to DONE, set complete date if not already set
      if (newStatus === 'DONE' && !task.completeDate) {
        updatedTask = {...updatedTask, completeDate: new Date().toISOString()}
      }
      setTasks(tasks.map((t) => t.id === taskId ? updatedTask : t))
    }
  }

  const handleCategoryAdd = (name) => {
    const newCategory = {id: crypto.randomUUID(), name}
    setCategories([...categories, newCategory])
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center space-x-6">
            <Link to="/" className="text-xl font-semibold text-blue-600">Kanban Board</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-medium hover:text-gray-600">Dashboard</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<KanbanBoard tasks={tasks} categories={categories} persons={persons} />} />
            <Route path="/dashboard" element={<Dashboard tasks={tasks} categories={categories} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
