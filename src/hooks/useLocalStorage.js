import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const serialized = localStorage.getItem(key)
      if (serialized === null) return initialValue
      return JSON.parse(serialized)
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
