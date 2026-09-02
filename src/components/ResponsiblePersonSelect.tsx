import React from 'react'
import { ResponsiblePerson } from '../types'

interface ResponsiblePersonSelectProps {
  personId: string | null
  onChange: (id: string | null) => void
  persons: ResponsiblePerson[]
}

const ResponsiblePersonSelect: React.FC<ResponsiblePersonSelectProps> = ({
  personId,
  onChange,
  persons,
}) => {
  return (
    <select
      value={personId || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Responsible Person</option>
      {persons.map((person) => (
        <option key={person.id} value={person.id}>{person.name}</option>
      ))}
    </select>
  )
}

export default ResponsiblePersonSelect
