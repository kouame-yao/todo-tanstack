import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  ssr: {
    external: ['sequelize', 'pg', 'moment', 'moment-timezone'],
  },

  plugins: [devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
})
export default config
