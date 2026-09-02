import React from 'react'
import { Task, Category } from '../types'

interface TaskCardProps {
  task: Task
  onMove: (newStatus: 'TO_DO' | 'DOING' | 'DONE') => void
  onDelete: (taskId: string) => void
  onEdit: (task: Task) => void
  categories: Category[]
  persons: ResponsiblePerson[]
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onMove,
  onDelete,
  onEdit,
  categories,
  persons,
}) => {
  const category = categories.find(c => c.id === task.categoryId) || {id: '', name: 'Uncategorized'}
  const person = persons.find(p => p.id === task.responsiblePersonId) || {id: '', name: 'Unassigned'}
  const statusClass = {
    'TO_DO': 'bg-gray-100',
    'DOING': 'bg-blue-100',
    'DONE': 'bg-green-100',
  }[task.status]

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString()
  }

  return (
    <div
      className={
        `rounded border p-4 mb-2 ${statusClass} transition-colors duration-300`
      }
    >
      <h3 className="font-medium mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
      <div className="flex flex-col space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Category: {category.name}</span>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex justify-between">
          <span>Start: {formatDate(task.startDate)}</span>
          <span>Complete: {formatDate(task.completeDate)}</span>
        </div>
        <div className="flex justify-between">
          <span>Assigned: {person.name}</span>
          <span>Status: {task.status}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3" />
    </div>
  )
}

export default TaskCard
