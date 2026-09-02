import { STATUSES, STATUS_LABELS } from '../types.js'

export default function TaskCard({ task, categories, persons, onMove, onEdit, onDelete }) {
  const category = categories.find((item) => item.id === task.categoryId)?.name || 'Uncategorized'
  const person = persons.find((item) => item.id === task.responsiblePersonId)?.name || 'Unassigned'
  const overdue = task.status !== 'DONE' && task.dueDate < new Date().toISOString().slice(0, 10)
  const initials = person.split(' ').map((word) => word[0]).join('').slice(0, 2)

  return (
    <article className="task-card" draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}>
      <div className="card-top"><span className="category-pill">{category}</span><div className="card-actions"><button onClick={onEdit} aria-label="Edit task">✎</button><button onClick={() => { if (confirm('Delete this task?')) onDelete() }} aria-label="Delete task">×</button></div></div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className={`date-row ${overdue ? 'overdue' : ''}`}><span>◷</span><span>{overdue ? 'Overdue · ' : 'Due · '}{new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></div>
      <div className="card-footer"><span className="avatar" title={person}>{initials}</span><select aria-label={`Move ${task.title}`} value={task.status} onChange={(e) => onMove(e.target.value)}>{STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></div>
    </article>
  )
}
