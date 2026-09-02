export interface ResponsiblePerson {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
}

export interface Task {
  id: string
  title: string
  description: string
  categoryId: string
  startDate: Date
  dueDate: Date
  completeDate: Date | null
  status: 'TO_DO' | 'DOING' | 'DONE'
  responsiblePersonId: string | null
  category: Category
  responsiblePerson: ResponsiblePerson
}

export const CATEGORIES_INITIAL: Category[] = []

export const TASKS_INITIAL: Task[] = []

export const STATUSES = ['TO_DO', 'DOING', 'DONE'] as const
