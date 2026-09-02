import React, { useState } from 'react'
import { Category } from '../types'

interface CategoryManagerProps {
  categories: Category[]
  onAddCategory: (name: string) => void
  onSelectCategory: (categoryId: string | null) => void
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onSelectCategory,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('')

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName)
      setNewCategoryName('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 rounded border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add new category"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded border border-blue-500 text-blue-600 hover:bg-blue-100"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default CategoryManager
