import { useState } from 'react'

export default function TaskForm({ task, categories, persons, onSave, onCancel, onAddCategory }) {
  const today = () => new Date().toISOString().slice(0, 10)
  const nextWeek = () => new Date(Date.now() + 604800000).toISOString().slice(0, 10)

  const [form, setForm] = useState(() => task || {
    id: crypto.randomUUID(), title: '', description: '', categoryId: categories[0]?.id || '',
    startDate: today(), dueDate: nextWeek(), completeDate: '', responsiblePersonId: persons[0]?.id || '', status: 'TO_DO',
  })
  const [newCategory, setNewCategory] = useState('')

  const update = (name, value) => setForm((current) => {
    const next = { ...current, [name]: value }
    if (name === 'status') next.completeDate = value === 'DONE' ? (current.completeDate || today()) : ''
    return next
  })

  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.categoryId || !form.responsiblePersonId) return
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  const createCategory = () => {
    const id = onAddCategory(newCategory)
    if (id) {
      update('categoryId', id)
      setNewCategory('')
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head"><div><span className="eyebrow">TASK DETAILS</span><h2 id="task-form-title">{task ? 'Edit task' : 'Create a new task'}</h2></div><button className="icon-button" type="button" onClick={onCancel}>×</button></div>
        <form onSubmit={submit}>
          <label>Title<input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="What needs to be done?" required /></label>
          <label>Description<textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Add useful details" rows={3} /></label>
          <div className="form-grid">
            <label>Category<select value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)} required><option value="">Select category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label>Responsible person<select value={form.responsiblePersonId} onChange={(e) => update('responsiblePersonId', e.target.value)} required>{persons.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label>
            <label>Start date<input type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} required /></label>
            <label>Due date<input type="date" min={form.startDate} value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} required /></label>
            <label>Status<select value={form.status} onChange={(e) => update('status', e.target.value)}><option value="TO_DO">TO DO</option><option value="DOING">DOING</option><option value="DONE">DONE</option></select></label>
            {form.status === 'DONE' && <label>Complete date<input type="date" value={form.completeDate} onChange={(e) => update('completeDate', e.target.value)} required /></label>}
          </div>
          <div className="new-category"><input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category name" /><button type="button" className="secondary" onClick={createCategory}>Add category</button></div>
          <div className="modal-actions"><button type="button" className="secondary" onClick={onCancel}>Cancel</button><button className="primary" type="submit">{task ? 'Save changes' : 'Create task'}</button></div>
        </form>
      </section>
    </div>
  )
}
