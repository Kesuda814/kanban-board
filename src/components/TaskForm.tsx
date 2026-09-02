import React, { useState } from 'react'
import { Task, Category, ResponsiblePerson } from '../types'

interface TaskFormProps {
  task: Task | null
  onSave: (task: Task) => void
  onCancel: () => void
  categories: Category[]
  persons: ResponsiblePerson[]
  status: 'TO_DO' | 'DOING' | 'DONE'
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSave,
  onCancel,
  categories,
  persons,
  status,
}) => {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    categoryId: task?.categoryId || categories[0]?.id || '',
    startDate: task?.startDate ? new Date(task.startDate) : new Date(),
    dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completeDate: task?.completeDate ? new Date(task.completeDate) : null,
    responsiblePersonId: task?.responsablePersonId || persons[0]?.id || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({...form, [name]: value})
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({...form, [name]: new Date(value)})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask: Task = {
      id: task?.id || crypto.randomUUID(),
      title: form.title,
      description: form.description,
      categoryId: form.categoryId,
      startDate: form.startDate,
      dueDate: form.dueDate,
      completeDate: form.completeDate,
      status: status,
      responsiblePersonId: form.responsablePersonId || null,
      category: categories.find(c => c.id === form.categoryId) || {id: '', name: 'Uncategorized'},
      responsiblePerson: persons.find(p => p.id === form.responsablePersonId) || {id: '', name: 'Unassigned'},
    }
    onSave(newTask)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Complete Date</label>
        <input
          type="date"
          name="completeDate"
          value={form.completeDate ? form.completeDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
          className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status !== 'DONE'}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <CategoryManager
          categories={categories}
          onAddCategory={(name) => {
            // Add category logic - will be handled by parent
          }}
          onSelectCategory={(categoryId) => {
            setForm({...form, categoryId})
          }}
        />
        <ResponsiblePersonSelect
          personId={form.responsiblePersonId}
          onChange={(id) => setForm({...form, responsiblePersonId: id})}
          persons={persons}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({...form, status: e.target.value})}
          className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TO_DO">TO DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
type="submit"
          className="flex-1 px-4 py-2 rounded border border-blue-500 bg-blue-600 text-white hover:bg-blue-700"
        >
          {task ? 'Update' : 'Create'} Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm
