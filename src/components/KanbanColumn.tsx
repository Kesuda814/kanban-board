import React from 'react'
import { Task } from '../types'
import TaskCard from './TaskCard'

interface KanbanColumnProps {
  status: 'TO_DO' | 'DOING' | 'DONE'
  tasks: Task[]
  onMoveTask: (taskId: string, newStatus: 'TO_DO' | 'DOING' | 'DONE') => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (task: Task) => void
  categories: any[]
  persons: any[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  tasks,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  categories,
  persons,
}) => {
  return (
    <div className="space-y-4">
      <div
        className={
          `border rounded-t header bg-gray-200 text-gray-700 px-3 py-2 font-medium`
        }
      >
        {status}
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No tasks</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={(newStatus) => onMoveTask(task.id, newStatus)}
              onDelete={() => onDeleteTask(task.id)}
              onEdit={(task) => onEditTask(task)}
              categories={categories}
              persons={persons}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default KanbanColumn
