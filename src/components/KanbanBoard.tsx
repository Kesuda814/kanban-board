import { useState } from 'react'
import type { Category, ResponsiblePerson, Status, Task } from '../types'
import KanbanColumn from './KanbanColumn'
import TaskForm from './TaskForm'

interface Props {
  tasks: Task[]
  categories: Category[]
  persons: ResponsiblePerson[]
  onSaveTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  onMoveTask: (id: string, status: Status) => void
  onAddCategory: (name: string) => string | null
}

export default function KanbanBoard({ tasks, categories, persons, onSaveTask, onDeleteTask, onMoveTask, onAddCategory }: Props) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  const openAdd = () => { setEditing(null); setAdding(true) }
  const close = () => { setAdding(false); setEditing(null) }

  return (
    <div className="board-page">
      <div className="page-head"><div><span className="eyebrow">PROJECT 1 · GROUP 3</span><h1>Kanban Board</h1><p className="subtitle">Plan, assign, and track tasks across TO DO → DOING → DONE.</p></div><button className="primary" onClick={openAdd}>+ Add task</button></div>
      <div className="board">
        {(['TO_DO', 'DOING', 'DONE'] as Status[]).map((status) => <KanbanColumn key={status} status={status} tasks={tasks.filter((task) => task.status === status)} categories={categories} persons={persons} onMoveTask={onMoveTask} onDeleteTask={onDeleteTask} onEditTask={setEditing} />)}
      </div>
      {(adding || editing) && <TaskForm task={editing} categories={categories} persons={persons} onSave={(task) => { onSaveTask(task); close() }} onCancel={close} onAddCategory={onAddCategory} />}
    </div>
  )
}
