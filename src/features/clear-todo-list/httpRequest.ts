import { getColumn } from "@/gateway/columns"
import { getTodos } from "@/gateway/todos"
import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestClearTodoListPayload = {
  payload: {
    userId: string
    columnId: string
  }
}

export async function httpRequestClearTodoList({ payload }: HttpRequestClearTodoListPayload) {
  await sleep(0.2)
  const todos = await getTodos(payload.columnId)
  await Promise.all(todos.map(todo => api.delete(`/todos/${todo.id}`)))
  const responseGetColumn = await getColumn(payload.columnId)
  return responseGetColumn
}
