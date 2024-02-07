import { api } from "@/services/api"
import { sleep } from "@/utils/sleep"

export type HttpRequestRemoveColumnPayload = {
  idColumn: string
}

export async function httpRequestRemoveColumn(payload: HttpRequestRemoveColumnPayload) {
  await sleep(0.5)
  // const response = await api.delete<unknown>(`/columns/${payload.idColumn}`)
  // console.log({ deleteResponse: response.data })
  // return response.data
  return
}
