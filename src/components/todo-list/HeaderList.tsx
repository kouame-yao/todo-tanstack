import { useCallback, type ChangeEvent } from 'react'
import type { postType } from '../../../server/models/post-model'
import { useCreatePost } from '#/api/hooks/post-hook'
import Loading from '../ui/Loading'

export default function HeaderList() {
  // HOOK D'AJOUT DE POST
  const { mutate, error, isPending } = useCreatePost()

  // FUNCTION DE D'APPLICATION DE L'AJOUT DU POST
  const pushPost = useCallback(async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const dataForm = new FormData(e.currentTarget)
    const value: postType = {
      title: dataForm.get('title')!.toString(),
      content: dataForm.get('content')!.toString(),
    }
    mutate(value, {
      onSuccess: () => form.reset(),
    })
  }, [])

  return (
    <div className="border sm:w-150 rounded-box p-4 ">
      {error && (
        <div className="alert alert-error">
          <div className="">{error.message}</div>
        </div>
      )}
      <form onSubmit={pushPost} action="" className="flex gap-2 w-full">
        <label htmlFor="" className="col-span-">
          Title
          <input
            name="title"
            type="text"
            className="input outline-none sm:w-full"
          />
        </label>
        <label htmlFor="">
          Content
          <input
            name="content"
            type="text"
            className="input outline-none sm:w-full"
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          Action
          <button type="submit" className="btn btn-square">
            {isPending ? <Loading /> : 'Add'}
          </button>
        </label>
      </form>
    </div>
  )
}
