import { TodoSession, UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestToggleTodoPayload, httpRequestToggleTodo } from "./httpRequest"

type UseToggleTodoMutationProps = {
  columnId: string
  todoId: string
}

export function useToggleTodoMutation({ columnId, todoId }: UseToggleTodoMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<TodoSession, DefaultError, HttpRequestToggleTodoPayload>({
    mutationKey: ECacheKeys.mutation.toggleTodo(todoId),
    mutationFn: (...args) => httpRequestToggleTodo(...args),
    onSuccess(_, variables) {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(variables.payload.userId), userSession => {
        return produce(userSession, draft => {
          const user = draft!
          const column = user.columns.find(c => c.id === columnId)!
          const todo = column.todos.find(t => t.id === todoId)!
          todo.isDone = variables.body.isDone
        })
      })
    },
  })
}
