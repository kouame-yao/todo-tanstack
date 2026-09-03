import { setThemeFn } from '#/utils/Theme-fn'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Moon, Sun } from 'lucide-react'
import { useCallback } from 'react'

export default function ButtonTheme() {
  const router = useRouter()
  const handSetTheme = useServerFn(setThemeFn)
  const { theme } = useRouteContext({ from: '__root__' })

  const ThemeToggle = useCallback(async () => {
    handSetTheme({ data: theme === 'dark' ? 'light' : 'dark' }).then(() =>
      router.invalidate(),
    )
  }, [theme])
  return (
    <div className="absolute overflow-hidden right-4 top-4  ">
      <button
        onClick={ThemeToggle}
        className="btn btn-circle bg-white text-black "
      >
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}
