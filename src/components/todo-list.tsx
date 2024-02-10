import React from "react"
import { cn } from "@/lib/utils"
import { useUserQuery } from "@/queries/useUserQuery"
import { userId } from "@/pages"
import { Todo } from "./todo"
import { useColumn } from "./hooks/useColumn"

export type TodoListProps = React.ComponentPropsWithoutRef<"ul"> & {
  columnId: string
}

export const TodoList = React.forwardRef<React.ElementRef<"ul">, TodoListProps>(function TodoListComponent(
  { columnId, className, ...props },
  ref,
) {
  const { data: todoIdList } = useColumn({ userId, columnId }, column => column.todos.map(t => t.id))

  if (!todoIdList) return <h1>No todo list found with column id {columnId}</h1>

  return (
    <ul
      {...props}
      className={cn("", className)}
      ref={ref}
    >
      {todoIdList.map(id => (
        <Todo
          key={id}
          columnId={columnId}
          userId={userId}
          todoId={id}
        />
      ))}
    </ul>
  )
})

TodoList.displayName = "TodoList"
