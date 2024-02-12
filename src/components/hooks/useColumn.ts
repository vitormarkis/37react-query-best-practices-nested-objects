import { ColumnSession } from "@/interfaces/UserSession"
import { useUserQuery } from "@/queries/useUserQuery"

type UseColumnProps = {
  columnId: string
}

export function useColumn<TData>({ columnId }: UseColumnProps, selector: (column: ColumnSession) => TData) {
  return useUserQuery<TData>({
    select: user => {
      const column = user.columns.find(c => c.id === columnId)!
      return selector(column)
    },
  })
}
