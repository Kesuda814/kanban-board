import type { Category, Task } from '../types'
import { computeStats } from '../components/dashboardUtils'

interface Props {
  tasks: Task[]
  categories: Category[]
}

const cards = [
  { key: 'total', label: 'Total tasks', color: 'navy' },
  { key: 'todo', label: 'TO DO', color: 'red' },
  { key: 'doing', label: 'DOING', color: 'blue' },
  { key: 'done', label: 'DONE', color: 'green' },
  { key: 'overdue', label: 'Overdue', color: 'amber' },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']

export default function Dashboard({ tasks, categories }: Props) {
  const stats = computeStats(tasks, categories)
  const rating = stats.total ? Math.round(((stats.early + stats.onTime) / (stats.early + stats.onTime + stats.late)) * 100) : 0

  const categoryEntries = Object.entries(stats.perCategory)
  const maxCategory = Math.max(1, ...categoryEntries.map((entry) => entry[1]))

  return (
    <div className="dashboard">
      <div className="page-head"><div><span className="eyebrow">PROJECT 1 · GROUP 3</span><h1>Dashboard</h1><p className="subtitle">Live summary of all tasks on the board.</p></div></div>
      <div className="stat-grid">
        {cards.map((card) => {
          const value = stats[card.key] as number
          return <div className={`stat-card ${card.color}`} key={card.key}><span className="stat-value">{value}</span><span className="stat-label">{card.label}</span></div>
        })}
      </div>
      <div className="dash-grid">
        <section className="card"><div className="card-title"><h2>Tasks by status</h2><span className="badge">Overview</span></div><div className="segmented">{[{ status: 'TO_DO', label: 'TO DO', value: stats.todo, color: '#ef4444' }, { status: 'DOING', label: 'DOING', value: stats.doing, color: '#3b82f6' }, { status: 'DONE', label: 'DONE', value: stats.done, color: '#10b981' }].map((item) => <div className="seg-col" key={item.status}><span className="seg-bar" style={{ height: stats.total ? `${Math.round((item.value / stats.total) * 100)}%` : '2%', background: item.color }} /><span className="seg-label">{item.label}</span><strong>{item.value}</strong></div>)}</div></section>
        <section className="card"><div className="card-title"><h2>Tasks by category</h2><span className="badge">{categoryEntries.length} categories</span></div>{categoryEntries.length ? <div className="bar-list">{categoryEntries.map(([name, count], index) => <div className="bar-row" key={name}><span className="bar-name">{name}</span><div className="track"><div className="fill" style={{ width: `${Math.round((count / maxCategory) * 100)}%`, background: COLORS[index % COLORS.length] }} /></div><strong>{count}</strong></div>)}</div> : <p className="muted">No categories with tasks yet.</p>}</section>
        <section className="card"><div className="card-title"><h2>Completion performance</h2><span className="badge">DONE only</span></div><div className="donut-wrap"><div className="donut" style={{ '--done': `${(stats.early + stats.onTime + stats.late) ? `${Math.round(((stats.early + stats.onTime) / (stats.early + stats.onTime + stats.late)) * 100)}%` : '0%'}` } as CSSProperties}><div className="donut-inner"><strong>{stats.total ? `${rating}%` : '—'}</strong><span>on time</span></div></div><div className="legend"><div className="legend-row"><span className="dot early" /><span>Early</span><strong>{stats.early}</strong></div><div className="legend-row"><span className="dot ontime" /><span>On time</span><strong>{stats.onTime}</strong></div><div className="legend-row"><span className="dot late" /><span>Late</span><strong>{stats.late}</strong></div></div></div></section>
      </div>
    </div>
  )
}
