import { TodoChangeTextModal } from "@/features/change-text-todo/components/modal"
import { HttpRequestToggleTodoPayload } from "@/features/toggle-todo/httpRequest"
import { useToggleTodoMutation } from "@/features/toggle-todo/mutation"
import { ECacheKeys } from "@/keys"
import { cn } from "@/lib/utils"
import { userId } from "@/pages"
import { useUserQuery } from "@/queries/useUserQuery"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useMutationState } from "@tanstack/react-query"
import React from "react"
import { Button } from "./button"
import { IconPencil } from "./icons/IconPencil"
import { useTodo } from "./hooks/useTodo"

export type TodoProps = React.ComponentPropsWithoutRef<"div"> & {
  userId: string
  todoId: string
  columnId: string
}

const Todo = React.forwardRef<React.ElementRef<"div">, TodoProps>(function TodoComponent(
  { userId, columnId, todoId, className, ...props },
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
    <div
      {...props}
      className={cn(
        "flex items-center bg-zinc-900 p-2 [&:not(:last-child)]:border-b border-zinc-800",
        className,
      )}
      ref={ref}
    >
      <TodoToggle
        columnId={columnId}
        todoId={todoId}
      />
      {/* {true ? ( */}
      {changeTextTodoMutationIsPending ? (
        <div className="ml-2 h-5 bg-slate-700 animate-pulse w-full rounded-sm" />
      ) : (
        <TodoText
          columnId={columnId}
          todoId={todoId}
        />
      )}
      <div className="ml-auto">
        <div className="pl-6 flex items-center gap-0.5">
          <TodoChangeTextModal
            columnId={columnId}
            todoId={todoId}
          >
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

export type TodoToggleProps = {
  columnId: string
  todoId: string
}

function TodoToggle({ columnId, todoId }: TodoToggleProps) {
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

export type TodoTextProps = {
  columnId: string
  todoId: string
}

function TodoText({ columnId, todoId }: TodoTextProps) {
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
