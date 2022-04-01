// ...classes: (string | undefined | null | false)[]
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
