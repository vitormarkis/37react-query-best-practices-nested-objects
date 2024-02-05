import { TodoSession, UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestChangeTextTodoPayload, httpRequestChangeTextTodo } from "./httpRequest"

type UseChangeTextTodoMutationProps = {
  columnId: string
  todoId: string
}

export function useChangeTextTodoMutation({ columnId, todoId }: UseChangeTextTodoMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<TodoSession, DefaultError, HttpRequestChangeTextTodoPayload>({
    mutationKey: ECacheKeys.mutation.changeTextTodo(todoId),
    mutationFn: (...args) => httpRequestChangeTextTodo(...args),
    onSuccess(newTodo, variables) {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(variables.payload.userId), userSession => {
        return produce(userSession, draft => {
          const user = draft!
          const column = user.columns.find(c => c.id === columnId)!
          const todo = column.todos.find(t => t.id === todoId)!
          todo.text = newTodo.text
        })
      })
    },
  })
}
