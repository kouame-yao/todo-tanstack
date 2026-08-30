import { usePosts } from '#/api/hooks/post-hook'
import TableRowBody from './TableRowBody'

export default function () {
  const { data, isPending, isError } = usePosts()
  return (
    <>
      {isError && (
        <div className="alert alert-error">
          <div>Une erreur est survenue</div>
        </div>
      )}
      {isPending ? (
        <div className="loading loading-spinner loading-xl"></div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-white bg-base-100 sm:w-150  ">
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
            <TableRowBody post={data || []} />
          </table>
        </div>
      )}
    </>
  )
}
