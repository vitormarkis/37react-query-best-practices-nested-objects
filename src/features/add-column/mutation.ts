import { ColumnSession, UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import { HttpRequestAddColumnPayload, httpRequestAddColumn } from "./httpRequest"

type UseAddColumnMutationProps = {
  userId: string
}

export function useAddColumnMutation({ userId }: UseAddColumnMutationProps) {
  const queryClient = useQueryClient()

  return useMutation<ColumnSession, DefaultError, HttpRequestAddColumnPayload>({
    mutationKey: ECacheKeys.mutation.addColumn(userId),
    mutationFn: (...args) => httpRequestAddColumn(...args),
    onSuccess(_, variables) {
      queryClient.setQueryData<UserSession>(ECacheKeys.user(userId), userSession => {
        return produce(userSession, draft => {
          draft?.columns.push(variables)
        })
      })
    },
  })
}
