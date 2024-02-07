import { ColumnSession, ColumnSessionAPI } from "@/interfaces/UserSession"
import { api } from "@/services/api"
import { getTodos } from "./todos"

export async function getColumn(columnId: string): Promise<void> {
  // const columnSessionAPIResponse = await api.get<ColumnSessionAPI>(`/columns/${columnId}`)
  // const columnSessionAPI = columnSessionAPIResponse.data
  // const todos = await getTodos(columnId)
  // const columnSession = {
  //   ...columnSessionAPI,
  //   todos,
  // }
  // return Promise.resolve(columnSession)
  return
}
