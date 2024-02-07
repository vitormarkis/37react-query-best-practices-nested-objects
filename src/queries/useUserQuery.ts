import { UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { useDebugValue } from "react"
import { USER_RESPONSE } from "./CONST_user_response"

type UseUserQueryProps = {
  userId: string
}

export function useUserQuery<TData = UserSession>(
  { userId }: UseUserQueryProps,
  options = {} as Omit<UndefinedInitialDataOptions<UserSession, Error, TData>, "queryKey">,
) {
  const query = useQuery<UserSession, Error, TData>({
    queryKey: ECacheKeys.user(userId),
    queryFn: () => fetchUserSession(userId),
    structuralSharing: true,
    ...options,
  })
  useDebugValue(query)
  return query
}

async function fetchUserSession(userId: string) {
  // const [userAPI, columnsListAPI] = await Promise.all([
  //   api.get<UserSessionAPI>(`/users/${userId}`).then(res => res.data),
  //   api.get<ColumnSessionAPI[]>(`/columns?idOwner=${userId}`).then(res => res.data),
  // ])

  // const columnListPromise = columnsListAPI.map(async column => {
  //   return getColumn(column.id)
  // })

  // const columns = await Promise.all(columnListPromise)

  const user = USER_RESPONSE

  return Promise.resolve(user)
}
