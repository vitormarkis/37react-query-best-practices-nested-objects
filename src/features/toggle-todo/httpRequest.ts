import { TodoSession } from "@/interfaces/UserSession"
import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestToggleTodoPayload = {
  payload: {
    todoId: string
    userId: string
  }
  body: HttpRequestToggleTodoBody
}

type HttpRequestToggleTodoBody = {
  isDone: boolean
}

export async function httpRequestToggleTodo({ body, payload }: HttpRequestToggleTodoPayload) {
  await sleep(0.3)
  const response = await api.patch<TodoSession>(`/todos/${payload.todoId}`, body)
  return response.data
}
