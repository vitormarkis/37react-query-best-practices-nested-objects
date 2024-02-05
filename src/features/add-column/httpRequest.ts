import { ColumnSession, TodoSession } from "@/interfaces/UserSession"
import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestAddColumnPayload = {
  idOwner: string
  id: string
  todos: TodoSession[]
}

export async function httpRequestAddColumn(payload: HttpRequestAddColumnPayload) {
  await sleep(1)
  const response = await api.post<ColumnSession>(`/columns`, payload)
  return response.data
}
