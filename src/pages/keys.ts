export const ECacheKeys = {
  user: (userId: string) => ["USER", userId],
  mutation: {
    addColumn: (userId: string) => ["ADD-COLUMN", userId],
    addTodo: (columnId: string) => ["ADD-TODO", columnId],
    toggleTodo: (columnId: string) => ["TOGGLE-TODO", columnId],
    clearTodoList: (columnId: string) => ["CLEAR-TODO-LIST", columnId],
    removeColumn: ["REMOVE-COLUMN"],
  },
}
