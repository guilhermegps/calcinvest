import { maskBrlInput, parseBrl } from '@/lib/format/brl'
import { inputClassName } from './Field'

type MoneyInputProps = {
  id: string
  value: string
  onChange: (masked: string, numeric: number) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
}

export function MoneyInput({
  id,
  value,
  onChange,
  placeholder = '0,00',
  disabled,
  readOnly,
}: MoneyInputProps) {
  return (
    <input
      id={id}
      inputMode="decimal"
      autoComplete="off"
      className={inputClassName}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      onChange={(e) => {
        const masked = maskBrlInput(e.target.value)
        onChange(masked, parseBrl(masked).toNumber())
      }}
    />
  )
}
