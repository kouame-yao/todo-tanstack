import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

import { useEditPost, usePost } from '#/api/hooks/post-hook'
import type { postType } from '../../../server/models/post-model'

export default function DialogModal() {
  // UTILISATION DU HOOK USE STATE POUR STOCKER LES VALEURS PARDEFAUT DE L'INPUT
  const [formCurrent, setFormCurrent] = useState<postType>()

  //HOOK TANSTACK ROUTER
  const navigate = useNavigate()
  const { postId } = useParams({ from: '/_authed/dashboard/{-$postId}' })

  // FUNCTION DE FERMERTURE DE LA MODAL
  const CloseModal = () => {
    const modale = document.getElementById('my_modal_1') as HTMLDialogElement
    modale?.close()
    resetPath()
  }
  const resetPath = () => {
    return navigate({
      to: '/dashboard/{-$postId}',
      params: { postId: undefined },
    })
  }
  //HOOK DE MODIFICATON DU POST
  const { mutate, reset, isPending } = useEditPost(
    postId?.toString(),
    CloseModal,
  )

  // HOOK POUR RECUPERER UN POST PAR SONT ID
  const { data: post } = usePost(postId?.toString() ?? '')

  // UTILISATION DU HOOK USEEFFECT POUR RECUPEREE LES VALEURS PAR DEFAUT DANS L'INPUT
  useEffect(() => {
    if (post) {
      reset()
      setFormCurrent(post as postType)
    }
  }, [post, postId])

  // FUNCTION D'APPLICATION DE LA MODIFICATION
  const EdditPost = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const formData = new FormData(form)
      const value: postType = {
        title: formData.get('title')!.toString(),
        content: formData.get('content')!.toString(),
      }
      setFormCurrent((prev) => ({ ...prev, ...value }))
      mutate({ post: value, postId: postId?.toString() ?? '' })
    },
    [postId],
  )

  // UTILISATION DU HOOK USE EFFECT POUR FERMER LA MODALE ET METTRE L URL A UNDEFINE
  useEffect(() => {
    const keyFonction = (e: KeyboardEvent) => {
      if (typeof window === 'undefined') return
      if (e.key === 'Escape') {
        if (postId) {
          resetPath()
        }
      }
    }
    window.addEventListener('keydown', keyFonction)
    return () => {
      window.removeEventListener('keydown', keyFonction)
    }
  }, [navigate, postId])

  // GESTION DU CHARGEMENT
  if (isPending) {
    return (
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </dialog>
    )
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Modifier l'item</h3>
        <form onSubmit={EdditPost} action="" className="grid gap-4 w-full ">
          <label htmlFor="" className="inline-block w-full">
            <p className="font-medium">Title</p>
            <input
              disabled={isPending}
              defaultValue={formCurrent?.title}
              name="title"
              type="text"
              className="input outline-none w-full"
            />
          </label>
          <label htmlFor="" className="inline-block w-full">
            <p className="font-medium">Content</p>
            <input
              defaultValue={formCurrent?.content}
              disabled={isPending}
              name="content"
              type="text"
              className="input outline-none w-full"
            />
          </label>
          <button disabled={isPending} className="btn btn-wide btn-primary">
            {isPending ? (
              <div className="loading loading-spinner"></div>
            ) : (
              ' Modifier'
            )}
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() =>
                navigate({
                  to: '/dashboard/{-$postId}',
                  params: { postId: undefined },
                })
              }
              className="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
