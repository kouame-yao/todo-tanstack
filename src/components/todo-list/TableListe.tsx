import { usePosts } from '#/api/hooks/post-hook'
import { toast } from 'sonner'
import type { postType } from '../../../server/models/post-model'
import TableRowBody from './TableRowBody'

export default function () {
  const { data, isPending, error } = usePosts()

  if (error) {
    toast.error(error.message)
  }

  return (
    <>
      {isPending ? (
        <div className="loading loading-spinner loading-xl"></div>
      ) : (
        <div className="overflow-x-auto card border  sm:w-150  ">
          <table className="table sm:table-lg">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <TableRowBody post={data as postType[]} />
          </table>
        </div>
      )}
    </>
  )
}
