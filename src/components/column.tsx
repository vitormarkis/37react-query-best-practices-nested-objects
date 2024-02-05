import { Button } from "@/components/button"
import { IconBrush } from "@/components/icons/IconBrush"
import { IconX } from "@/components/icons/IconX"
import { Todo } from "@/components/todo"
import { HttpRequestAddTodoPayload } from "@/features/add-todo/httpRequest"
import { useAddTodoMutation } from "@/features/add-todo/mutation"
import { HttpRequestClearTodoListPayload } from "@/features/clear-todo-list/httpRequest"
import { useClearTodoListMutation } from "@/features/clear-todo-list/mutation"
import { HttpRequestRemoveColumnPayload } from "@/features/remove-column/httpRequest"
import { useRemoveColumnMutation } from "@/features/remove-column/mutation"
import { ColumnSession } from "@/interfaces/UserSession"
import { cn } from "@/lib/utils"
import React, { memo } from "react"
import { toast } from "sonner"
import _ from "lodash"

export type ColumnProps = React.ComponentPropsWithoutRef<"div"> & {
  column: ColumnSession
  userId: string
}

const Column = React.forwardRef<React.ElementRef<"div">, ColumnProps>(function ColumnComponent(
  { userId, column, className, ...props },
  ref,
) {
  const addTodoMutation = useAddTodoMutation({
    columnId: column.id,
  })

  const handleAddTodo = async () => {
    const input: HttpRequestAddTodoPayload = {
      body: {
        id: crypto.randomUUID(),
        idColumn: column.id,
        isDone: false,
        text: Math.random().toString(36).substring(2, 14),
      },
      payload: {
        userId,
      },
    }

    const response = await addTodoMutation.mutateAsync(input)
    console.log({ response })
    toast.success("Todo adicionado.")
  }

  const clearTodoListMutation = useClearTodoListMutation({
    columnId: column.id,
  })

  const handleClearTodoList = async () => {
    const input: HttpRequestClearTodoListPayload = {
      payload: {
        columnId: column.id,
        userId,
      },
    }

    const response = await clearTodoListMutation.mutateAsync(input)
    console.log({ response })
    toast.success("Coluna limpa.")
  }

  const removeColumnMutation = useRemoveColumnMutation({
    columnId: column.id,
    userId,
  })

  const handleRemoveColumn = async () => {
    const input: HttpRequestRemoveColumnPayload = {
      idColumn: column.id,
    }

    const response = await removeColumnMutation.mutateAsync(input)
    console.log({ response })
    toast.success("Coluna removida.")
  }

  return (
    <div
      {...props}
      className={cn("flex flex-col p-0.5 bg-zinc-800 min-w-[11rem]", className)}
      ref={ref}
    >
      <div className="pl-2 flex">
        <div>
          <span className="text-sm">{column.id.slice(0, 6)}...</span>
        </div>
        <div className="ml-auto flex gap-1">
          <Button
            disabled={clearTodoListMutation.isPending}
            onClick={handleClearTodoList}
            size="icon"
          >
            <IconBrush className="size-3" />
          </Button>
          <Button
            disabled={removeColumnMutation.isPending}
            onClick={handleRemoveColumn}
            size="icon"
            color="destructive"
          >
            <IconX className="size-3" />
          </Button>
        </div>
      </div>
      <div className="pt-0.5">
        {column.todos.length > 0 ? (
          column.todos.map(todo => (
            <Todo
              userId={userId}
              key={todo.id}
              todo={todo}
            />
          ))
        ) : (
          <span className="text-sm font-bold text-zinc-600 px-2">No todos...</span>
        )}
      </div>
      <div className="mt-auto">
        <div className="pt-1">
          <Button
            disabled={addTodoMutation.isPending}
            onClick={handleAddTodo}
            variant="todo-list"
            color="rose"
          >
            Add Todo
          </Button>
        </div>
      </div>
    </div>
  )
})

Column.displayName = "Column"

const memoColumn = memo(Column, (prev, next) => {
  return _.isEqual(prev, next)
})
export { memoColumn as Column }
