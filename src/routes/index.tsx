import { createFileRoute } from '@tanstack/react-router'
import { Activity, useState } from 'react'
import SignIn from '#/components/login/SignIn'
import SignUp from '#/components/login/SignUp'

export const Route = createFileRoute('/')({
  component: Login,
})

function Login() {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="flex justify-center items-center h-screen mx-auto">
      <Activity mode={toggle ? 'hidden' : 'visible'}>
        <SignIn setToggle={setToggle} />
      </Activity>
      <Activity mode={toggle ? 'visible' : 'hidden'}>
        <SignUp setToggle={setToggle} />
      </Activity>
    </div>
  )
}
