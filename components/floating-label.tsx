"use client"

interface FloatingLabelProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
}

export function FloatingLabel({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  multiline = false,
  rows = 4,
}: FloatingLabelProps) {
  const hasValue = value.length > 0

  if (multiline) {
    return (
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors peer resize-none"
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            hasValue ? "top-2 text-xs text-primary" : "top-3 text-muted-foreground"
          }`}
        >
          {label}
        </label>
      </div>
    )
  }

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors peer"
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          hasValue ? "top-2 text-xs text-primary" : "top-3 text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  )
}
