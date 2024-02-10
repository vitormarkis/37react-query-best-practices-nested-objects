import { TodoSession } from "@/interfaces/UserSession"
import { useUserQuery } from "@/queries/useUserQuery"

type UseTodoProps = {
  userId: string
  todoId: string
  columnId: string
}

export function useTodo<TData>(
  { userId, todoId, columnId }: UseTodoProps,
  selector: (todo: TodoSession) => TData,
) {
  return useUserQuery<TData>(
    { userId },
    {
      select: user => {
        const todo = user.columns.find(c => c.id === columnId)!.todos.find(t => t.id === todoId)!
        return selector(todo)
      },
    },
  )
}
