import { TextField } from 'datocms-react-ui'
import { useState } from 'react'

type ExcludedLocalesFieldProps = {
  value: string
  onBlur: (newValue: string) => void
}

export default function ExcludedLocales({
  value,
  onBlur,
}: ExcludedLocalesFieldProps) {
  const [excludedLocales, setExcludedLocales] = useState<string>(value)

  return (
    <TextField
      name="excludedLocales"
      id="excludedLocales"
      label="Exclude Locales"
      hint="Please enter a comma-separated list of the locales that you want to exclude from translation."
      value={excludedLocales}
      placeholder="Example: theme, variant"
      textInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value)
        },
      }}
      onChange={(newValue) => setExcludedLocales(newValue)}
    />
  )
}
