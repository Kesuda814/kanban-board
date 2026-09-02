import { useEffect, useState } from 'react'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import KanbanBoard from './components/KanbanBoard.jsx'
import Dashboard from './pages/Dashboard.jsx'

const PEOPLE = [
  { id: 'p1', name: 'Kesuda' },
  { id: 'p2', name: 'Thwe Hnin Eain' },
  { id: 'p3', name: 'Hein Nyan Swen' },
]
const DEFAULT_CATEGORIES = [
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'research', name: 'Research' },
]

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [tasks, setTasks] = useState(() => readStorage('kanban-tasks', []))
  const [categories, setCategories] = useState(() => readStorage('kanban-categories', DEFAULT_CATEGORIES))

  useEffect(() => localStorage.setItem('kanban-tasks', JSON.stringify(tasks)), [tasks])
  useEffect(() => localStorage.setItem('kanban-categories', JSON.stringify(categories)), [categories])

  const saveTask = (task) => setTasks((current) => {
    const exists = current.some((item) => item.id === task.id)
    return exists ? current.map((item) => item.id === task.id ? task : item) : [...current, task]
  })

  const moveTask = (id, status) => setTasks((current) => current.map((task) => {
    if (task.id !== id) return task
    return {
      ...task,
      status,
      completeDate: status === 'DONE' ? (task.completeDate || new Date().toISOString().slice(0, 10)) : '',
    }
  }))

  const addCategory = (name) => {
    const cleanName = name.trim()
    if (!cleanName) return null
    const existing = categories.find((item) => item.name.toLowerCase() === cleanName.toLowerCase())
    if (existing) return existing.id
    const category = { id: crypto.randomUUID(), name: cleanName }
    setCategories((current) => [...current, category])
    return category.id
  }

  return (
    <HashRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink to="/" className="brand"><span>✓</span> TaskFlow</NavLink>
          <nav>
            <NavLink to="/" end>Kanban Board</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
        </header>
        <main className="page">
          <Routes>
            <Route path="/" element={<KanbanBoard tasks={tasks} categories={categories} persons={PEOPLE} onSaveTask={saveTask} onDeleteTask={(id) => setTasks((items) => items.filter((task) => task.id !== id))} onMoveTask={moveTask} onAddCategory={addCategory} />} />
            <Route path="/dashboard" element={<Dashboard tasks={tasks} categories={categories} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
