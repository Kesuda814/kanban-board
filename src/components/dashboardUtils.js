export function computeStats(tasks, categories) {
  const today = new Date().toISOString().slice(0, 10)
  let total = 0, todo = 0, doing = 0, done = 0, overdue = 0, early = 0, onTime = 0, late = 0
  const perCategory = {}
  categories.forEach((cat) => { perCategory[cat.name] = 0 })

  tasks.forEach((task) => {
    total += 1
    if (task.status === 'TO_DO') todo += 1
    else if (task.status === 'DOING') doing += 1
    else done += 1
    if (task.status !== 'DONE' && task.dueDate && task.dueDate < today) overdue += 1
    if (task.categoryId) {
      const cat = categories.find((item) => item.id === task.categoryId)
      if (cat) perCategory[cat.name] = (perCategory[cat.name] || 0) + 1
    }
    if (task.status === 'DONE' && task.completeDate && task.dueDate) {
      if (task.completeDate < task.dueDate) early += 1
      else if (task.completeDate === task.dueDate) onTime += 1
      else late += 1
    }
  })

  return { total, todo, doing, done, overdue, early, onTime, late, perCategory }
}
