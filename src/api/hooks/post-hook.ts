import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import {
  AddPostHanler,
  DeletePostHandler,
  GetPostAllHandler,
  GetPostHandler,
  UpdatePostHandler,
} from '../../../server/routes/post-route'
import type { postType } from '../../../server/models/post-model'
import { toast } from 'sonner'
// INITIALISATION DES CLEE DE POST
const postsListKey = ['posts', 'list'] as const

// HOOK POUR RECUPERE TOUT LES POSTS
export const usePosts = () => {
  const posts = useServerFn(GetPostAllHandler)
  return useQuery({
    queryKey: postsListKey,
    queryFn: async () => await posts(),
    refetchOnWindowFocus: false,
  })
}

// HOOK POUR RECUPEREE UN POST PAR SON IDENTIFIANT
export const usePost = (postId: string) => {
  const post = useServerFn(GetPostHandler)
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => await post({ data: postId }),
    enabled: !!postId,
  })
}

// HOOK POUR CREE UN POST
export const useCreatePost = () => {
  const create = useServerFn(AddPostHanler)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: postType) => await create({ data: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      toast.success('Post ajouter')
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}

// HOOK POUR MODIFIER UN POST
export const useEditPost = (
  postId: string | undefined,
  onSuccess: () => void,
) => {
  const create = useServerFn(UpdatePostHandler)
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['edit-post', postId],
    mutationFn: async (data: { post: postType; postId: string }) =>
      await create({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      onSuccess?.()
      toast.success('post modifier')
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}

// HOOK POR SUPPRIMEE UN POST
export const useDeletePost = () => {
  const create = useServerFn(DeletePostHandler)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (postId: string) => await create({ data: postId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      toast.warning('post supprimer' + data.message)
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}
