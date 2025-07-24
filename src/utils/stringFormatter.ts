export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const pathnameToTitle = (pathname: string): string => {
  if (pathname === '/') return 'Home'
  const parts = pathname.split('/').filter(Boolean)
  return parts.map((part) => capitalizeFirstLetter(part)).join(' / ')
}
