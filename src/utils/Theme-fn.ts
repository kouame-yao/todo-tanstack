import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
const themeName = 'theme-data'
type themeType = 'dark' | 'light'
export const getThemeFn = createServerFn({ method: 'GET' }).handler(
  () => getCookie(themeName) as themeType,
)
export const setThemeFn = createServerFn({ method: 'POST' })
  .validator((data: themeType) => data)
  .handler(({ data }) => setCookie(themeName, data))
