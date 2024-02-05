import { getColumn } from "@/gateway/columns"
import { ColumnSessionAPI, UserSession, UserSessionAPI } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/pages/keys"
import { api } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

type UseUserQueryProps = {
  userId: string
}

export function useUserQuery({ userId }: UseUserQueryProps) {
  return useQuery<UserSession>({
    queryKey: ECacheKeys.user(userId),
    async queryFn() {
      const [userAPI, columnsListAPI] = await Promise.all([
        api.get<UserSessionAPI>(`/users/${userId}`).then(res => res.data),
        api.get<ColumnSessionAPI[]>(`/columns?idOwner=${userId}`).then(res => res.data),
      ])

      const columnListPromise = columnsListAPI.map(async column => {
        return getColumn(column.id)
      })

      const columns = await Promise.all(columnListPromise)

      const user: UserSession = {
        ...userAPI,
        columns,
      }

      return Promise.resolve(user)
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
