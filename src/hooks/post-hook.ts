import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { postType } from '../../server/models/post-model'
import { toast } from 'sonner'
import { ApiFetch } from '#/utils/Fecth-fn'
// INITIALISATION DES CLEE DE POST
const postsListKey = ['posts', 'list'] as const

// HOOK POUR RECUPERE TOUT LES POSTS
export const usePosts = () => {
  return useQuery({
    queryKey: postsListKey,
    queryFn: async () =>
      await ApiFetch('http://localhost:3000/api/v1/post', { method: 'GET' }),
    refetchOnWindowFocus: false,
  })
}

// HOOK POUR RECUPEREE UN POST PAR SON IDENTIFIANT
export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: async () =>
      await ApiFetch(`http://localhost:3000/api/v1/post/${postId}`, {
        method: 'GET',
      }),
    enabled: !!postId,
  })
}

// HOOK POUR CREE UN POST
export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: postType) =>
      await ApiFetch('http://localhost:3000/api/v1/post', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      toast.success(data.message)
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['edit-post', postId],
    mutationFn: async (data: { post: postType; postId: string }) =>
      await ApiFetch(`http://localhost:3000/api/v1/post/${data.postId}`, {
        method: 'PUT',
        body: JSON.stringify(data.post),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      onSuccess?.()
      toast.success(data.message)
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}

// HOOK POR SUPPRIMEE UN POST
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (postId: string) =>
      await ApiFetch(`http://localhost:3000/api/v1/post/${postId}`, {
        method: 'DELETE',
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsListKey })
      toast.warning(data.message)
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}
