import React from 'react'
import { useState } from 'react'
import { Category, Task, ResponsiblePerson } from '../types'
import KanbanColumn from './KanbanColumn'
import TaskForm from './TaskForm'

interface KanbanBoardProps {
  tasks: Task[]
  categories: Category[]
  persons: ResponsiblePerson[]
  onAddTask: (task: Task) => void
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onMoveTask: (taskId: string, newStatus: 'TO_DO' | 'DOING' | 'DONE') => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  categories,
  persons,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onMoveTask,
}) => {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleAdd = (task: Task) => {
    onAddTask(task)
    setShowForm(false)
  }

  const handleUpdate = (task: Task) => {
    onUpdateTask(task)
    setShowForm(false)
  }

  const handleDelete = (taskId: string) => {
    onDeleteTask(taskId)
  }

  const handleMove = (taskId: string, newStatus: 'TO_DO' | 'DOING' | 'DONE') => {
    onMoveTask(taskId, newStatus)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Kanban Board</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded border bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>
      <TaskForm
        task={editingTask}
        onSave={(task) => {
          if (task.id === editingTask?.id) {
            onUpdateTask(task)
          } else {
            onAddTask(task)
          }
          setEditingTask(null)
        }}
        onCancel={() => {
          setEditingTask(null)
          setShowForm(false)
        }}
        categories={categories}
        persons={persons}
        status="TO_DO"
      />
      <div className="grid grid-cols-3 gap-4">
        <KanbanColumn
          status="TO_DO"
          tasks={tasks.filter((t) => t.status === 'TO_DO')}
          onMoveTask={handleMove}
          onDeleteTask={handleDelete}
          onEditTask={handleUpdate}
          categories={categories}
          persons={persons}
        />
        <KanbanColumn
          status="DOING"
          tasks={tasks.filter((t) => t.status === 'DOING')}
          onMoveTask={handleMove}
          onDeleteTask={handleDelete}
          onEditTask={handleUpdate}
          categories={categories}
          persons={persons}
        />
        <KanbanColumn
          status="DONE"
          tasks={tasks.filter((t) => t.status === 'DONE')}
          onMoveTask={handleMove}
          onDeleteTask={handleDelete}
          onEditTask={handleUpdate}
          categories={categories}
          persons={persons}
        />
      </div>
    </div>
  )
}

export default KanbanBoard
