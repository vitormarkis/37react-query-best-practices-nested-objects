import { UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestRemoveColumnPayload, httpRequestRemoveColumn } from "./httpRequest"

type UseRemoveColumnMutationProps = {
  columnId: string
  userId: string
}

export function useRemoveColumnMutation({ columnId, userId }: UseRemoveColumnMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<unknown, DefaultError, HttpRequestRemoveColumnPayload>({
    mutationKey: ECacheKeys.mutation.removeColumn(columnId),
    mutationFn: (...args) => httpRequestRemoveColumn(...args),
    onSuccess() {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(userId), userSession => {
        return produce(userSession, draft => {
          const user = draft!
          const columnIndex = user.columns.findIndex(c => c.id === columnId)
          user.columns.splice(columnIndex, 1)
        })
      })
    },
  })
}
