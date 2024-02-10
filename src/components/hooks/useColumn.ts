import { ColumnSession } from "@/interfaces/UserSession"
import { useUserQuery } from "@/queries/useUserQuery"

type UseColumnProps = {
  userId: string
  columnId: string
}

export function useColumn<TData>(
  { userId, columnId }: UseColumnProps,
  selector: (column: ColumnSession) => TData,
) {
  return useUserQuery<TData>(
    { userId },
    {
      select: user => {
        const column = user.columns.find(c => c.id === columnId)!
        return selector(column)
      },
    },
  )
}
