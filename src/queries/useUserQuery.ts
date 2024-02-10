import { getColumn } from "@/gateway/columns"
import { ColumnSessionAPI, UserSession, UserSessionAPI } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { api } from "@/services/api"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { useDebugValue } from "react"

type UseUserQueryProps = {
  userId: string
}

type Options<TData> = Omit<UndefinedInitialDataOptions<UserSession, Error, TData>, "queryKey">

export function useUserQuery<TData>({ userId }: UseUserQueryProps, options = {} as Options<TData>) {
  const query = useQuery<UserSession, Error, TData>({
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
    ...options,
  })
  useDebugValue(query)
  return query
}
