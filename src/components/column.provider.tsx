import { createContext, useContextSelector } from "use-context-selector"

export type IColumnIdContext = string

export interface IColumnIdProps {
  columnId: string
  children: React.ReactNode
}

export const ColumnIdContext = createContext<null | string>(null)

export function ColumnIdProvider({ children, columnId }: IColumnIdProps) {
  return <ColumnIdContext.Provider value={columnId}>{children}</ColumnIdContext.Provider>
}

export const useColumnId = () => {
  const id = useContextSelector(ColumnIdContext, userId => userId)
  if (!id) throw new Error("useContextSelector.ooc")
  return id
}
