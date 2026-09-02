import { computeStats } from '../components/dashboardUtils.js'

const cards = [
  { key: 'total', label: 'Total tasks', color: 'navy' },
  { key: 'todo', label: 'TO DO', color: 'red' },
  { key: 'doing', label: 'DOING', color: 'blue' },
  { key: 'done', label: 'DONE', color: 'green' },
  { key: 'overdue', label: 'Overdue', color: 'amber' },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']
const STATUS_SEGMENTS = [
  { status: 'TO_DO', label: 'TO DO', color: '#ef4444' },
  { status: 'DOING', label: 'DOING', color: '#3b82f6' },
  { status: 'DONE', label: 'DONE', color: '#10b981' },
]
const COMPLETION_SEGMENTS = [
  { label: 'Early', color: '#10b981' },
  { label: 'On time', color: '#3b82f6' },
  { label: 'Late', color: '#ef4444' },
]

function conicGradient(segments, denominator) {
  const total = Math.max(1, denominator)
  let cursor = 0
  return `conic-gradient(${segments.map((seg) => {
    const start = cursor
    cursor += (seg.value / total) * 100
    return `${seg.color} ${start}% ${cursor}%`
  }).join(', ')})`
}

export default function Dashboard({ tasks, categories }) {
  const stats = computeStats(tasks, categories)
  const completed = stats.early + stats.onTime + stats.late
  const onTimePct = completed ? Math.round(((stats.early + stats.onTime) / completed) * 100) : 0

  const categoryEntries = Object.entries(stats.perCategory)
  const maxCategory = Math.max(1, ...categoryEntries.map((entry) => entry[1]))

  const statusData = STATUS_SEGMENTS.map((seg) => ({ ...seg, value: stats[seg.status.toLowerCase()] }))
  const completionData = COMPLETION_SEGMENTS.map((seg) => ({ ...seg, value: stats[seg.label.toLowerCase().replace(' ', '')] }))

  return (
    <div className="dashboard">
      <div className="page-head"><div><span className="eyebrow">PROJECT 1 · GROUP 3</span><h1>Dashboard</h1><p className="subtitle">Live summary of all tasks on the board.</p></div></div>
      <div className="stat-grid">
        {cards.map((card) => (
          <div className={`stat-card ${card.color}`} key={card.key}><span className="stat-value">{stats[card.key]}</span><span className="stat-label">{card.label}</span></div>
        ))}
      </div>
      <div className="dash-grid">
        <section className="card"><div className="card-title"><h2>Task status</h2><span className="badge">Doughnut</span></div>{stats.total ? <div className="donut-wrap"><div className="donut" style={{ background: conicGradient(statusData, stats.total) }}><div className="donut-inner"><strong>{stats.total}</strong><span>tasks</span></div></div><div className="legend">{statusData.map((seg) => <div className="legend-row" key={seg.status}><span className="dot" style={{ background: seg.color }} /><span>{seg.label}</span><strong>{seg.value}</strong></div>)}</div></div> : <p className="muted">No tasks yet.</p>}</section>
        <section className="card"><div className="card-title"><h2>Tasks by category</h2><span className="badge">Bar chart</span></div>{categoryEntries.length ? <div className="bar-list">{categoryEntries.map(([name, count], index) => <div className="bar-row" key={name}><span className="bar-name">{name}</span><div className="track"><div className="fill" style={{ width: `${Math.round((count / maxCategory) * 100)}%`, background: COLORS[index % COLORS.length] }} /></div><strong>{count}</strong></div>)}</div> : <p className="muted">No categories with tasks yet.</p>}</section>
        <section className="card"><div className="card-title"><h2>Completion performance</h2><span className="badge">Doughnut</span></div>{completed ? <div className="donut-wrap"><div className="donut" style={{ background: conicGradient(completionData, completed) }}><div className="donut-inner"><strong>{onTimePct}%</strong><span>on time</span></div></div><div className="legend">{completionData.map((seg) => <div className="legend-row" key={seg.label}><span className="dot" style={{ background: seg.color }} /><span>{seg.label}</span><strong>{seg.value}</strong></div>)}</div></div> : <p className="muted">No completed tasks yet.</p>}</section>
      </div>
    </div>
  )
}
