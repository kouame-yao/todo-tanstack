import { Pen, Trash2 } from 'lucide-react'
import type { postType } from '../../../server/models/post-model'
import { useNavigate } from '@tanstack/react-router'
import { useDeletePost } from '#/api/hooks/post-hook'
import { useCallback } from 'react'
import Loading from '../ui/Loading'

export default function TableRowBody({ post }: { post: postType[] }) {
  //HOOK DE LA SUPPRESSION DU POST
  const { mutate, isPending, variables } = useDeletePost()

  // HOOK TANSTACK ROUTER
  const navigate = useNavigate()

  // FUNCTION D'APPLICATION DE LA SUPPRESSION DU POST
  const OpenDialogModal = useCallback((postId: string) => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement
    modal.showModal()
    navigate({ to: '/dashboard/{-$postId}', params: { postId: postId } })
  }, [])

  return (
    <tbody>
      {post?.map((row, index) => {
        return (
          <tr key={row.id}>
            <th>{index + 1}</th>
            <td>{row.title}</td>
            <td>{row.content}</td>
            <td>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => OpenDialogModal(row.id!.toString())}
                  className="btn btn-square btn-warning"
                >
                  <Pen />
                </button>
                <button
                  onClick={() => mutate(row.id!.toString())}
                  className="btn btn-square btn-error disabled:btn-neutral "
                  disabled={isPending && variables === row.id}
                >
                  {isPending && variables === row.id ? <Loading /> : <Trash2 />}
                </button>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
