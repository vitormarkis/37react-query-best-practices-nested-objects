import { TodoChangeTextModal } from "@/features/change-text-todo/components/modal"
import { HttpRequestToggleTodoPayload } from "@/features/toggle-todo/httpRequest"
import { useToggleTodoMutation } from "@/features/toggle-todo/mutation"
import { TodoSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { cn } from "@/lib/utils"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useMutationState } from "@tanstack/react-query"
import _ from "lodash"
import React, { memo } from "react"
import { Button } from "./button"
import { IconPencil } from "./icons/IconPencil"

export type TodoProps = React.ComponentPropsWithoutRef<"div"> & {
  userId: string
  todo: TodoSession
}

const Todo = React.forwardRef<React.ElementRef<"div">, TodoProps>(function TodoComponent(
  { userId, todo, className, ...props },
  ref,
) {
  const toggleTodoMutation = useToggleTodoMutation({
    columnId: todo.idColumn,
    todoId: todo.id,
  })

  const handleToggleTodo = async () => {
    const input: HttpRequestToggleTodoPayload = {
      body: {
        isDone: !todo.isDone,
      },
      payload: {
        todoId: todo.id,
        userId,
      },
    }

    await toggleTodoMutation.mutateAsync(input)
  }

  const [changeTextTodoMutation] = useMutationState({
    filters: {
      mutationKey: ECacheKeys.mutation.changeTextTodo(todo.id),
      status: "pending",
    },
  })

  const changeTextTodoMutationIsPending = !!changeTextTodoMutation

  return (
    <div
      {...props}
      className={cn(
        "flex items-center bg-zinc-900 p-2 [&:not(:last-child)]:border-b border-zinc-800",
        className,
      )}
      ref={ref}
    >
      <Checkbox.Root
        className="size-6 bg-slate-800 border border-slate-700 disabled:cursor-not-allowed disabled:bg-opacity-30 shrink-0"
        defaultChecked={todo.isDone}
        onCheckedChange={handleToggleTodo}
        disabled={toggleTodoMutation.isPending}
      >
        <Checkbox.Indicator className="grid place-items-center">
          <CheckIcon className="size-5" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {/* {true ? ( */}
      {changeTextTodoMutationIsPending ? (
        <div className="ml-2 h-5 bg-slate-700 animate-pulse w-full rounded-sm" />
      ) : (
        <p className="pl-2 text-sm">{todo.text}</p>
      )}
      <div className="ml-auto">
        <div className="pl-6 flex items-center gap-0.5">
          <TodoChangeTextModal>
            <Button
              size="icon"
              className="group"
            >
              <IconPencil className="size-3 duration-100 text-zinc-500 group-hover:text-white" />
            </Button>
          </TodoChangeTextModal>
        </div>
      </div>
    </div>
  )
})

Todo.displayName = "Todo"

export { Todo }
