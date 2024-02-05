import { ColumnSession, TodoSession } from "@/interfaces/UserSession"
import { cn } from "@/lib/utils"
import { useUserQuery } from "@/queries/useUserQuery"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { Inter } from "next/font/google"
import React from "react"
import { toast } from "sonner"
import { HttpRequestAddColumnPayload } from "../features/add-column/httpRequest"
import { useAddColumnMutation } from "../features/add-column/mutation"
import { Button } from "@/components/button"
import { HttpRequestAddTodoPayload } from "@/features/add-todo/httpRequest"
import { useAddTodoMutation } from "@/features/add-todo/mutation"
import { useToggleTodoMutation } from "@/features/toggle-todo/mutation"
import { HttpRequestToggleTodoPayload } from "@/features/toggle-todo/httpRequest"
import { IconBrush } from "@/components/icons/IconBrush"
import { useClearTodoListMutation } from "@/features/clear-todo-list/mutation"
import { HttpRequestClearTodoListPayload } from "@/features/clear-todo-list/httpRequest"
import { IconX } from "@/components/icons/IconX"
import { useRemoveColumnMutation } from "@/features/remove-column/mutation"
import { HttpRequestRemoveColumnPayload } from "@/features/remove-column/httpRequest"

const userId = "ef499b10-d774-4a13-b585-7e29541430cc"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { data: user } = useUserQuery({ userId })

  const addColumnMutation = useAddColumnMutation({
    userId,
  })

  if (!user) {
    return <div>Loading...</div>
  }

  const handleAddColumn = async () => {
    const input: HttpRequestAddColumnPayload = {
      id: crypto.randomUUID(),
      todos: [],
      idOwner: userId,
    }

    const response = await addColumnMutation.mutateAsync(input)
    console.log({ response })
    toast.success("Coluna adicionada.")
  }

  return (
    <main className={cn("", inter.className)}>
      <Container>
        <h1>Todos</h1>
      </Container>
      <Container className="mt-6">
        <Button
          disabled={addColumnMutation.isPending}
          onClick={handleAddColumn}
        >
          Add Column
        </Button>
      </Container>
      <Container className="flex flex-wrap gap-8 mt-6">
        {user.columns.map(column => (
          <Column
            key={column.id}
            column={column}
          />
        ))}
      </Container>
    </main>
  )
}

export type ColumnProps = React.ComponentPropsWithoutRef<"div"> & {
  column: ColumnSession
}

export const Column = React.forwardRef<React.ElementRef<"div">, ColumnProps>(function ColumnComponent(
  { column, className, ...props },
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
        text: Math.random().toString(36).substring(0, 14),
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

export type TodoProps = React.ComponentPropsWithoutRef<"div"> & {
  todo: TodoSession
}

export const Todo = React.forwardRef<React.ElementRef<"div">, TodoProps>(function TodoComponent(
  { todo, className, ...props },
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

export type ContainerProps = React.ComponentPropsWithoutRef<"section"> & {}

export const Container = React.forwardRef<React.ElementRef<"section">, ContainerProps>(
  function ContainerComponent({ className, ...props }, ref) {
    return (
      <section
        {...props}
        className={cn("mx-auto max-w-[1440px] px-12", className)}
        ref={ref}
      />
    )
  },
)

Container.displayName = "Container"
