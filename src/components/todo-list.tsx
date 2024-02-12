import React from "react"
import { cn } from "@/lib/utils"
import { useUserQuery } from "@/queries/useUserQuery"
import { userId } from "@/pages"
import { Todo } from "./todo"
import { useColumn } from "./hooks/useColumn"
import { useColumnId } from "./column.provider"

export type TodoListProps = React.ComponentPropsWithoutRef<"ul"> & {}

export const TodoList = React.forwardRef<React.ElementRef<"ul">, TodoListProps>(function TodoListComponent(
  { className, ...props },
  ref,
) {
  const columnId = useColumnId()
  const { data: todoIdList } = useColumn({ columnId }, column => column.todos.map(t => t.id))
  console.log({ todoIdList })

  return (
    <ul
      {...props}
      className={cn("", className)}
      ref={ref}
    >
      {todoIdList.map(id => (
        <Todo
          key={id}
          todoId={id}
        />
      ))}
    </ul>
  )
})

TodoList.displayName = "TodoList"
