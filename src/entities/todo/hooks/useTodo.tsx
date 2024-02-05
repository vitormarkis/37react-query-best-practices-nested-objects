import { TodoSession } from "@/interfaces/UserSession"
import React from "react"
import { createContext, useContextSelector } from "use-context-selector"

export interface ITodoContext extends TodoSession {}

export interface ITodoProviderProps {
  children: React.ReactNode
  todo: TodoSession
}

export const TodoContext = createContext({} as ITodoContext)

export function TodoProvider({ todo, children }: ITodoProviderProps) {
  return <TodoContext.Provider value={todo}>{children}</TodoContext.Provider>
}

export function useTodo<TSelection>(selector: (state: ITodoContext) => TSelection): TSelection {
  return useContextSelector(TodoContext, selector)
}
