import { ColumnSession, UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestClearTodoListPayload, httpRequestClearTodoList } from "./httpRequest"

type UseClearTodoListMutationProps = {
  columnId: string
}

export function useClearTodoListMutation({ columnId }: UseClearTodoListMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<void, DefaultError, HttpRequestClearTodoListPayload>({
    mutationKey: ECacheKeys.mutation.clearTodoList(columnId),
    mutationFn: (...args) => httpRequestClearTodoList(...args),
    onSuccess(_, variables) {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(variables.payload.userId), userSession => {
        return produce(userSession, draft => {
          const user = draft!
          const columnIndex = user.columns.findIndex(c => c.id === columnId)
          user.columns[columnIndex].todos = []
        })
      })
    },
  })
}
