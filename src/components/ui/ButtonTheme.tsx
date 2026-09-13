import { setThemeFn } from '#/utils/Theme-fn'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Moon, Sun } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function ButtonTheme({ thm }: { thm: any }) {
  const router = useRouter()
  const handSetTheme = useServerFn(setThemeFn)
  const { theme } = useRouteContext({ from: '__root__' })
  const [themes, setThemes] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // 2. Ce code s'exécute uniquement sur le client après l'hydratation
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setThemes(isDark ? 'dark' : 'light')
  }, [])
  const fistvalue = thm === undefined ? themes : theme
  const ThemeToggle = useCallback(async () => {
    handSetTheme({ data: fistvalue === 'dark' ? 'light' : 'dark' }).then(() =>
      router.invalidate(),
    )
  }, [theme])
  return (
    <div className="absolute overflow-hidden right-4 top-4  ">
      <button
        onClick={ThemeToggle}
        className="btn btn-circle bg-white text-black "
      >
        {fistvalue === 'light' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}
