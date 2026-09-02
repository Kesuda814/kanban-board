export type Status = 'TO_DO' | 'DOING' | 'DONE'

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
  startDate: string
  dueDate: string
  completeDate: string
  responsiblePersonId: string
  status: Status
}

export const STATUSES: Status[] = ['TO_DO', 'DOING', 'DONE']
export const STATUS_LABELS: Record<Status, string> = {
  TO_DO: 'TO DO',
  DOING: 'DOING',
  DONE: 'DONE',
}

