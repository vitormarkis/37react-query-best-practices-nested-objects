import { TodoSession } from "@/interfaces/UserSession"
import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestChangeTextTodoPayload = {
  payload: {
    todoId: string
    userId: string
  }
  body: HttpRequestChangeTextTodoBody
}

type HttpRequestChangeTextTodoBody = {
  text: string
}

export async function httpRequestChangeTextTodo({ body, payload }: HttpRequestChangeTextTodoPayload) {
  await sleep(5)
  const response = await api.patch<TodoSession>(`/todos/${payload.todoId}`, body)
  return response.data
}
