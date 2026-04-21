'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface TagInputProps {
  description?: string
  label: string
  onChange: (value: string[]) => void
  placeholder?: string
  value: string[]
}

export function TagInput({
  description,
  label,
  onChange,
  placeholder,
  value
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  function addTag() {
    const nextValue = inputValue.trim()

    if (!nextValue || value.includes(nextValue)) {
      setInputValue('')
      return
    }

    onChange([...value, nextValue])
    setInputValue('')
  }

  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-label uppercase tracking-[0.16em] text-text-secondary">{label}</span>
      <div className="field-shell rounded-[24px] px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary-light/90 px-3 py-1.5 text-xs font-semibold text-primary"
            >
              {item}
              <button
                aria-label={`Remove ${item}`}
                className="text-primary/80 transition hover:text-primary"
                onClick={() => onChange(value.filter((currentItem) => currentItem !== item))}
                type="button"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          className={cn(
            'mt-2 h-10 w-full border-0 bg-transparent p-0 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-0'
          )}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addTag()
            }
          }}
          placeholder={placeholder}
          type="text"
          value={inputValue}
        />
      </div>
      {description ? <span className="text-xs text-text-tertiary">{description}</span> : null}
    </label>
  )
}
