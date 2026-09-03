import HeaderList from '#/components/todo-list/HeaderList'
import TableListe from '#/components/todo-list/TableListe'
import DialogModal from '#/components/ui/DialogModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard/{-$postId}')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center h-screen sm:w-full gap-4 px-4 sm:px-0">
      <HeaderList />
      <TableListe />
      <DialogModal />
    </div>
  )
}
