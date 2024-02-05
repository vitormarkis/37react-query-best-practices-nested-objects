import { TodoSession } from "@/interfaces/UserSession"
import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestAddTodoPayload = {
  payload: {
    userId: string
  }
  body: HttpRequestAddTodoBody
}

type HttpRequestAddTodoBody = {
  idColumn: string
  id: string
  text: string
  isDone: boolean
}

export async function httpRequestAddTodo(payload: HttpRequestAddTodoPayload) {
  await sleep(1)
  const response = await api.post<TodoSession>(`/todos`, payload.body)
  return response.data
}
