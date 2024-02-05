import { ColumnSession } from "@/interfaces/UserSession"
import _ from "lodash"
import React, { memo } from "react"
import { createContext, useContextSelector } from "use-context-selector"

export interface IColumnContext extends ColumnSession {}

export interface IColumnProviderProps {
  children: React.ReactNode
  column: ColumnSession
}

export const ColumnContext = createContext({} as IColumnContext)

export function ColumnProvider({ column, children }: IColumnProviderProps) {
  return <ColumnContext.Provider value={column}>{children}</ColumnContext.Provider>
}

export function useColumn<TSelection>(selector: (state: IColumnContext) => TSelection): TSelection {
  return useContextSelector(ColumnContext, selector)
}
