import React from 'react'
import { Bar } from 'react-chartjs-2'

interface DashboardProps {
  tasks: any[]
  categories: any[]
}

const Dashboard: React.FC<DashboardProps> = ({tasks, categories}) => {
  // Calculate summary stats
  const totalTasks = tasks.length
  const todoCount = tasks.filter((t: any) => t.status === 'TO_DO').length
  const doingCount = tasks.filter((t: any) => t.status === 'DOING').length
  const doneCount = tasks.filter((t: any) => t.status === 'DONE').length

  // Calculate overdue tasks
  const now = new Date()
  const overdueCount = tasks.filter((t: any) => {
    const dueDate = new Date(t.dueDate)
    return t.status !== 'DONE' && dueDate < now
  }).length

  // Task status distribution
  const statusCounts = {
    TO_DO: todoCount,
    DOING: doingCount,
    DONE: doneCount,
  }

  // Task category distribution
  const categoryCounts: Record<string, number> = {}
  categories.forEach((cat: any) => {
    categoryCounts[cat.name] = 0
  })
  tasks.forEach((t: any) => {
    const cat = categories.find((c: any) => c.id === t.categoryId)
    if (cat) {
      categoryCounts[cat.name] = (categoryCounts[cat.name] || 0) + 1
    }
  })

  // Completion performance
  const earlyCount = tasks.filter((t: any) => {
    if (t.status !== 'DONE' || !t.completeDate || !t.dueDate) return false
    const complete = new Date(t.completeDate)
    const due = new Date(t.dueDate)
    return complete < due
  }).length

  const onTimeCount = tasks.filter((t: any) => {
    if (t.status !== 'DONE' || !t.completeDate || !t.dueDate) return false
    const complete = new Date(t.completeDate)
    const due = new Date(t.dueDate)
    return complete >= due && complete <= now
  }).length

  const lateCount = tasks.filter((t: any) => {
    if (t.status !== 'DONE' || !t.completeDate || !t.dueDate) return false
    const complete = new Date(t.completeDate)
    const due = new Date(t.dueDate)
    return complete > now
  }).length

  // Chart data for status (Pie chart)
  const statusChartData = {
    labels: ['TO_DO', 'DOING', 'DONE'],
    datasets: [
      {
        data: [todoCount, doingCount, doneCount],
        backgroundColor: ['#ef4444', '#3b82f6', '#22c55e'],
      },
    ],
  }

  // Chart data for categories (Bar chart)
  const categoryChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Tasks per Category',
        data: Object.values(categoryCounts),
        backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
      },
    ],
  }

  // Chart data for completion performance (Pie chart)
  const performanceChartData = {
    labels: ['Early', 'On Time', 'Late'],
    datasets: [
      {
        data: [earlyCount, onTimeCount, lateCount],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
      },
    ],
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Tasks Card */}
        <div className="rounded-lg bg-white p-4 shadow shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-sm text-gray-500">Total Tasks</div>
        </div>
        {/* TO DO Card */}
        <div className="rounded-lg bg-white p-4 shadow shadow-sm">
          <div className="text-2xl font-bold text-gray-900 text-red-600">{todoCount}</div>
          <div className="text-sm text-gray-500">TO DO</div>
        </div>
        {/* DOING Card */}
        <div className="rounded-lg bg-white p-4 shadow shadow-sm">
          <div className="text-2xl font-bold text-gray-900 text-blue-600">{doingCount}</div>
          <div className="text-sm text-gray-500">DOING</div>
        </div>
        {/* DONE Card */}
        <div className="rounded-lg bg-white p-4 shadow shadow-sm">
          <div className="text-2xl font-bold text-gray-900 text-green-600">{doneCount}</div>
          <div className="text-sm text-gray-500">DONE</div>
        </div>
        {/* Overdue Card */}
        <div className="rounded-lg bg-white p-4 shadow shadow-sm" style={{borderLeft: '4px solid #ef4444'}}
        >
          <div className="text-2xl font-bold text-gray-900 text-red-600">{overdueCount}</div>
          <div className="text-sm text-gray-500">Overdue</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Status Chart - Pie */}
        <div>
          <h3 className="text-semibold mb-4">Task Status Distribution</h3>
          <Bar
            width={400}
            height={400}
            data={statusChartData}
            options={{responsive: true}}
          />
        </div>

        {/* Category Chart - Bar */}
        <div>
          <h3 className="text-semibold mb-4">Tasks by Category</h3>
          <Bar
            width={400}
            height={400}
            data={categoryChartData}
            options={{responsive: true}}
          />
        </div>

        {/* Completion Performance - Pie */}
        <div>
          <h3 className="text-semibold mb-4">Completion Performance</h3>
          <Bar
            width={400}
            height={400}
            data={performanceChartData}
            options={{responsive: true}}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
