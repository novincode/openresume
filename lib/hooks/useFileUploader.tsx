import { useRef, useState } from 'react'

interface UseFileUploaderOptions {
  accept?: string
  onFile: (file: File) => Promise<true | string> | void
}

export function useFileUploader({ accept, onFile }: UseFileUploaderOptions) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const trigger = () => {
    inputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const result = await onFile(file)
      if (typeof result === 'string') setError(result)
      else setError(null)
    } catch (err: any) {
      setError('File import failed.')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const inputProps = {
    ref: inputRef,
    type: 'file',
    accept,
    style: { display: 'none' },
    onChange: handleChange,
    tabIndex: -1,
    'aria-hidden': 'true',
  } as const

  return { inputProps, trigger, error, loading, inputRef, setError }
}
