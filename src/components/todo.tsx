import { HttpRequestToggleTodoPayload } from "@/features/toggle-todo/httpRequest"
import { useToggleTodoMutation } from "@/features/toggle-todo/mutation"
import { TodoSession } from "@/interfaces/UserSession"
import { cn } from "@/lib/utils"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import React, { memo } from "react"
import _ from "lodash"

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

  return (
    <div
      {...props}
      className={cn("flex bg-zinc-900 p-2 [&:not(:last-child)]:border-b border-zinc-800", className)}
      ref={ref}
    >
      <Checkbox.Root
        className="size-6 bg-slate-800 border border-slate-700"
        defaultChecked={todo.isDone}
        onCheckedChange={handleToggleTodo}
        disabled={toggleTodoMutation.isPending}
      >
        <Checkbox.Indicator className="grid place-items-center">
          <CheckIcon className="size-5" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p className="pl-2">{todo.text}</p>
    </div>
  )
})

Todo.displayName = "Todo"

const memoTodo = memo(Todo, (prev, next) => {
  return _.isEqual(prev, next)
})
export { memoTodo as Todo }
