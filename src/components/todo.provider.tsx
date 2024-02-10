import { createContext, useContextSelector } from "use-context-selector"

export type ITodoIdContext = string

export interface ITodoIdProps {
  todoId: string
  children: React.ReactNode
}

export const TodoIdContext = createContext<null | string>(null)

export function TodoIdProvider({ children, todoId }: ITodoIdProps) {
  return <TodoIdContext.Provider value={todoId}>{children}</TodoIdContext.Provider>
}

export const useTodoId = () => {
  const id = useContextSelector(TodoIdContext, userId => userId)
  if (!id) throw new Error("useContextSelector.ooc")
  return id
}
