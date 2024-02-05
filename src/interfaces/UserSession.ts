export interface UserSessionAPI {
  id: string
  username: string
  profilePicture: string
}

export interface UserSession extends UserSessionAPI {
  columns: ColumnSession[]
}
export interface ColumnSessionAPI {
  idOwner: string
  id: string
}

export interface ColumnSession extends ColumnSessionAPI {
  todos: TodoSession[]
}

export interface TodoSession {
  idColumn: string
  id: string
  text: string
  isDone: boolean
}
