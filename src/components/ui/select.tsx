import React, { useState, createContext, useContext, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../utils/cn'

// ─── Context ──────────────────────────────────────────────────────────────────

interface SelectCtx {
  value: string
  selectedLabel: string
  onSelect: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectCtx>({} as SelectCtx)

function useSelect() {
  return useContext(SelectContext)
}

// ─── Label extraction (reads children tree synchronously) ─────────────────────

function extractLabel(children: React.ReactNode, targetValue: string): string {
  let found = ''
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return
    const type = child.type as React.ComponentType & { displayName?: string }
    if (type.displayName === 'SelectContent') {
      React.Children.forEach((child.props as React.PropsWithChildren).children, item => {
        if (!React.isValidElement(item)) return
        const itype = item.type as React.ComponentType & { displayName?: string }
        if (itype.displayName === 'SelectItem') {
          const itemProps = item.props as { value: string; children: React.ReactNode }
          if (itemProps.value === targetValue) {
            found = typeof itemProps.children === 'string' ? itemProps.children : targetValue
          }
        }
      })
    }
  })
  return found
}

// ─── Select (root) ────────────────────────────────────────────────────────────

export function Select({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  required: _req,
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  required?: boolean
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const selectedLabel = extractLabel(children, value)

  const handleSelect = (v: string) => {
    if (!isControlled) setInternalValue(v)
    onValueChange?.(v)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <SelectContext.Provider value={{ value, selectedLabel, onSelect: handleSelect, open, setOpen }}>
      <div ref={rootRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

// ─── SelectTrigger ────────────────────────────────────────────────────────────

export function SelectTrigger({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const { open, setOpen } = useSelect()
  return (
    <button
      id={id}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm',
        'focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        open && 'ring-2 ring-magenta/30 border-magenta',
        className,
      )}
    >
      {children}
      <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform shrink-0 ml-2', open && 'rotate-180')} />
    </button>
  )
}

// ─── SelectValue ──────────────────────────────────────────────────────────────

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedLabel } = useSelect()
  return (
    <span className={cn('truncate', !selectedLabel && 'text-gray-400')}>
      {selectedLabel || placeholder || 'Sélectionner…'}
    </span>
  )
}
SelectValue.displayName = 'SelectValue'

// ─── SelectContent ────────────────────────────────────────────────────────────

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useSelect()
  if (!open) return null
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden',
        'animate-in fade-in-0 zoom-in-95',
        className,
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}
SelectContent.displayName = 'SelectContent'

// ─── SelectItem ───────────────────────────────────────────────────────────────

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { value: selectedValue, onSelect } = useSelect()
  const isSelected = selectedValue === value
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        'relative flex w-full items-center gap-2 px-3 py-2 text-sm text-left',
        'hover:bg-magenta/5 hover:text-magenta transition-colors',
        isSelected && 'text-magenta font-medium bg-magenta/5',
        className,
      )}
    >
      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
      {!isSelected && <span className="w-3.5 shrink-0" />}
      {children}
    </button>
  )
}
SelectItem.displayName = 'SelectItem'
