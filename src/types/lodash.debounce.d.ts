declare module 'lodash.debounce' {
  type Debounced<T extends (...args: never[]) => unknown> = ((...args: Parameters<T>) => void) & {
    cancel(): void
    flush(): ReturnType<T> | undefined
  }

  export default function debounce<T extends (...args: never[]) => unknown>(
    func: T,
    wait?: number,
    options?: {
      leading?: boolean
      maxWait?: number
      trailing?: boolean
    },
  ): Debounced<T>
}
