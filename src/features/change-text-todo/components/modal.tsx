import { Button } from "@/components/button"
import { cn } from "@/lib/utils"
import { userId } from "@/pages"
import * as Dialog from "@radix-ui/react-dialog"
import React, { useState } from "react"
import { toast } from "sonner"
import { HttpRequestChangeTextTodoPayload } from "../httpRequest"
import { useChangeTextTodoMutation } from "../mutation"

export type TodoChangeTextModalProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  children: React.ReactNode
}

export const TodoChangeTextModal = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  TodoChangeTextModalProps
>(function TodoChangeTextModalComponent({ children, className, ...props }, ref) {
  // const columnId = useColumn(state => state.id)
  // const todoId = useTodo(state => state.id)
  // const todoText = useTodo(state => state.text)
  const columnId = ""
  const todoId = ""
  const todoText = ""
  const [text, setText] = useState(todoText)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const changeTextTodoMutation = useChangeTextTodoMutation({
    columnId,
    todoId,
  })

  const handleChangeTextTodo = async () => {
    const input: HttpRequestChangeTextTodoPayload = {
      payload: {
        todoId,
        userId,
      },
      body: {
        text,
      },
    }

    setIsModalOpen(false)
    const response = await changeTextTodoMutation.mutateAsync(input)
    console.log({ response })
    toast.success("Change text successfully.")
  }

  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          {...props}
          className={cn(
            "fixed top-[50%] left-[50%] max-h-[85vh] max-w-[90vw] translate-x-[-50%] translate-y-[-50%] bg-zinc-900 border border-zinc-800 focus:outline-none p-0.5 flex flex-col",
            className,
          )}
          ref={ref}
        >
          <Dialog.Title className="px-1 font-bold">Change todo's text</Dialog.Title>
          <div className="mt-1.5">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              type="text"
              className="h-9 px-2 bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <div>
              <Dialog.Close asChild>
                <Button
                  size="sm"
                  color="destructive"
                  autoFocus
                >
                  Close
                </Button>
              </Dialog.Close>
            </div>
            <div className="ml-auto">
              <Button
                size="sm"
                color="amber"
                disabled={changeTextTodoMutation.isPending}
                onClick={handleChangeTextTodo}
              >
                Update
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

TodoChangeTextModal.displayName = "TodoChangeTextModal"
