import { Button } from "@/components/button"
import { IconBrush } from "@/components/icons/IconBrush"
import { IconX } from "@/components/icons/IconX"
import { HttpRequestAddTodoPayload } from "@/features/add-todo/httpRequest"
import { useAddTodoMutation } from "@/features/add-todo/mutation"
import { HttpRequestClearTodoListPayload } from "@/features/clear-todo-list/httpRequest"
import { useClearTodoListMutation } from "@/features/clear-todo-list/mutation"
import { HttpRequestRemoveColumnPayload } from "@/features/remove-column/httpRequest"
import { useRemoveColumnMutation } from "@/features/remove-column/mutation"
import { cn } from "@/lib/utils"
import { userId } from "@/pages"
import React from "react"
import { toast } from "sonner"
import { TodoList } from "./todo-list"
import { ColumnIdProvider, useColumnId } from "./column.provider"
import { useQueryClient } from "@tanstack/react-query"
import { ECacheKeys } from "@/keys"
import { produce } from "immer"
import { UserSession } from "@/interfaces/UserSession"

export type ColumnProps = React.ComponentPropsWithoutRef<"div"> & {
  columnId: string
}

const Column = React.forwardRef<React.ElementRef<"div">, ColumnProps>(function ColumnComponent(
  { columnId, className, ...props },
  ref,
) {
  const clearTodoListMutation = useClearTodoListMutation({
    columnId,
  })

  const handleClearTodoList = async () => {
    const input: HttpRequestClearTodoListPayload = {
      payload: {
        columnId,
        userId,
      },
    }

    clearTodoListMutation.mutate(input, {
      onSuccess(response) {
        console.log({ response })
        toast.success("Coluna limpa.")
      },
    })
  }

  const removeColumnMutation = useRemoveColumnMutation({
    columnId,
    userId,
  })

  const handleRemoveColumn = async () => {
    const input: HttpRequestRemoveColumnPayload = {
      idColumn: columnId,
    }

    removeColumnMutation.mutate(input, {
      onSuccess(response) {
        console.log({ response })
        toast.success("Coluna removida.")
      },
    })
  }

  return (
    <ColumnIdProvider columnId={columnId}>
      <div
        {...props}
        className={cn("flex flex-col p-0.5 bg-zinc-800 min-w-[13rem]", className)}
        ref={ref}
      >
        <div className="pl-2 flex">
          <div>
            <span className="text-sm">{columnId.slice(0, 6)}...</span>
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
          <TodoList />
        </div>
        <div className="mt-auto">
          <div className="pt-1">
            <ColumnAddTodo />
            <ColumnClearTodoListCache />
          </div>
        </div>
      </div>
    </ColumnIdProvider>
  )
})

Column.displayName = "Column"

const ColumnAddTodo: React.FC = () => {
  const columnId = useColumnId()
  const addTodoMutation = useAddTodoMutation({
    columnId,
  })

  const handleAddTodo = async () => {
    const input: HttpRequestAddTodoPayload = {
      body: {
        id: crypto.randomUUID(),
        idColumn: columnId,
        isDone: false,
        text: Math.random().toString(36).substring(2, 14),
      },
      payload: {
        userId,
      },
    }

    addTodoMutation.mutate(input, {
      onSuccess() {
        toast.success("Todo adicionado.")
      },
    })
  }

  return (
    <Button
      disabled={addTodoMutation.isPending}
      onClick={handleAddTodo}
      variant="todo-list"
      color="colorless"
    >
      Add Todo
    </Button>
  )
}

const ColumnClearTodoListCache: React.FC = () => {
  const columnId = useColumnId()
  const queryClient = useQueryClient()

  const handleClearTodoListCache = async () => {
    queryClient.setQueryData<UserSession>(ECacheKeys.user(userId), userCache => {
      return produce(userCache, user => {
        const column = user?.columns.find(c => c.id === columnId)
        column!.todos = []
      })
    })
  }

  return (
    <Button
      onClick={handleClearTodoListCache}
      variant="todo-list"
      color="colorless"
    >
      Clear Todo list on cache
    </Button>
  )
}

// const memoColumn = memo(Column, (prev, next) => {
//   return _.isEqual(prev.column, next.column)
// })

// export { memoColumn as Column }
export { Column }
