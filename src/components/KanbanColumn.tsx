import type { Category, ResponsiblePerson, Status, Task } from '../types'
import { STATUS_LABELS } from '../types'
import TaskCard from './TaskCard'

interface Props {
  status: Status
  tasks: Task[]
  categories: Category[]
  persons: ResponsiblePerson[]
  onMoveTask: (id: string, status: Status) => void
  onDeleteTask: (id: string) => void
  onEditTask: (task: Task) => void
}

export default function KanbanColumn({ status, tasks, categories, persons, onMoveTask, onDeleteTask, onEditTask }: Props) {
  return (
    <section className={`kanban-column ${status.toLowerCase()}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { const id = e.dataTransfer.getData('text/plain'); if (id) onMoveTask(id, status) }}>
      <div className="column-head"><div><span className="status-dot" /><h2>{STATUS_LABELS[status]}</h2></div><span className="count">{tasks.length}</span></div>
      <div className="card-list">
        {tasks.map((task) => <TaskCard key={task.id} task={task} categories={categories} persons={persons} onMove={(next) => onMoveTask(task.id, next)} onDelete={() => onDeleteTask(task.id)} onEdit={() => onEditTask(task)} />)}
        {!tasks.length && <div className="empty-column">Drop tasks here</div>}
      </div>
    </section>
  )
}
