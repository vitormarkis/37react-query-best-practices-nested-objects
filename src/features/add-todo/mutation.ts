import { TodoSession, UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestAddTodoPayload, httpRequestAddTodo } from "./httpRequest"

type UseAddTodoMutationProps = {
  columnId: string
}

export function useAddTodoMutation({ columnId }: UseAddTodoMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<TodoSession, DefaultError, HttpRequestAddTodoPayload>({
    mutationKey: ECacheKeys.mutation.addTodo(columnId),
    mutationFn: (...args) => httpRequestAddTodo(...args),
    onSuccess(_, variables) {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(variables.payload.userId), userSession => {
        return produce(userSession, draft => {
          const user = draft!
          const column = user.columns.find(c => c.id === columnId)!
          column.todos.push(variables.body)
        })
      })
    },
  })
}
