export const ECacheKeys = {
  user: (userId: string) => ["USER", userId],
  mutation: {
    addColumn: (userId: string) => ["ADD-COLUMN", userId],
    addTodo: (columnId: string) => ["ADD-TODO", columnId],
    toggleTodo: (todoId: string) => ["TOGGLE-TODO", todoId],
    changeTextTodo: (todoId: string) => ["CHANGE-TEXT-TODO", todoId],
    clearTodoList: (columnId: string) => ["CLEAR-TODO-LIST", columnId],
    removeColumn: (columnId: string) => ["REMOVE-COLUMN", columnId],
  },
}
