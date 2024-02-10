import { TodoChangeTextModal } from "@/features/change-text-todo/components/modal"
import { HttpRequestToggleTodoPayload } from "@/features/toggle-todo/httpRequest"
import { useToggleTodoMutation } from "@/features/toggle-todo/mutation"
import { ECacheKeys } from "@/keys"
import { cn } from "@/lib/utils"
import { userId } from "@/pages"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useMutationState } from "@tanstack/react-query"
import React from "react"
import { Button } from "./button"
import { useColumnId } from "./column.provider"
import { useTodo } from "./hooks/useTodo"
import { IconPencil } from "./icons/IconPencil"
import { TodoIdProvider, useTodoId } from "./todo.provider"

export type TodoProps = React.ComponentPropsWithoutRef<"div"> & {
  todoId: string
}

const Todo = React.forwardRef<React.ElementRef<"div">, TodoProps>(function TodoComponent(
  { todoId, className, ...props },
  ref,
) {
  const [changeTextTodoMutation] = useMutationState({
    filters: {
      mutationKey: ECacheKeys.mutation.changeTextTodo(todoId),
      status: "pending",
    },
  })

  const changeTextTodoMutationIsPending = !!changeTextTodoMutation

  return (
    <TodoIdProvider todoId={todoId}>
      <div
        {...props}
        className={cn(
          "flex items-center bg-zinc-900 p-2 [&:not(:last-child)]:border-b border-zinc-800",
          className,
        )}
        ref={ref}
      >
        <TodoToggle />
        {/* {true ? ( */}
        {changeTextTodoMutationIsPending ? (
          <div className="ml-2 h-5 bg-slate-700 animate-pulse w-full rounded-sm" />
        ) : (
          <TodoText />
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
    </TodoIdProvider>
  )
})

Todo.displayName = "Todo"

export { Todo }

function TodoToggle() {
  const todoId = useTodoId()
  const columnId = useColumnId()

  const { data: isDone } = useTodo(
    {
      columnId,
      todoId,
      userId,
    },
    todo => todo.isDone,
  )

  const toggleTodoMutation = useToggleTodoMutation({
    columnId,
    todoId,
  })

  const handleToggleTodo = async () => {
    const input: HttpRequestToggleTodoPayload = {
      body: {
        isDone: !isDone,
      },
      payload: {
        todoId,
        userId,
      },
    }

    await toggleTodoMutation.mutateAsync(input)
  }

  return (
    <Checkbox.Root
      className="size-6 bg-slate-800 border border-slate-700 disabled:cursor-not-allowed disabled:bg-opacity-30 shrink-0"
      defaultChecked={isDone}
      onCheckedChange={handleToggleTodo}
      disabled={toggleTodoMutation.isPending}
    >
      <Checkbox.Indicator className="grid place-items-center">
        <CheckIcon className="size-5" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

TodoToggle.displayName = "TodoToggle"

function TodoText() {
  const todoId = useTodoId()
  const columnId = useColumnId()
  const { data: text } = useTodo(
    {
      columnId,
      todoId,
      userId,
    },
    todo => todo.text,
  )
  // const { data: text } = useUserQuery(
  //   { userId },
  //   {
  //     select: user => user.columns.find(c => c.id === columnId)!.todos.find(t => t.id === todoId)!.text,
  //   },
  // )

  return <p className="pl-2 text-sm">{text}</p>
}

TodoText.displayName = "TodoText"
