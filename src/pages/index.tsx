import { Button } from "@/components/button"
import { Column } from "@/components/column"
import { cn } from "@/lib/utils"
import { useUserQuery } from "@/queries/useUserQuery"
import { Inter } from "next/font/google"
import React from "react"
import { toast } from "sonner"
import { HttpRequestAddColumnPayload } from "../features/add-column/httpRequest"
import { useAddColumnMutation } from "../features/add-column/mutation"

export const userId = "ef499b10-d774-4a13-b585-7e29541430cc"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const addColumnMutation = useAddColumnMutation({
    userId,
  })

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
          color="amber"
        >
          Add Column
        </Button>
      </Container>
      <Container className="mt-6">
        <ColumnList />
      </Container>
    </main>
  )
}

export type ColumnListProps = React.ComponentPropsWithoutRef<"div"> & {}

export const ColumnList = React.forwardRef<React.ElementRef<"div">, ColumnListProps>(
  function ColumnListComponent({ className, ...props }, ref) {
    const { data: columnIdList } = useUserQuery<string[]>(
      { userId },
      {
        select: user => user.columns.map(c => c.id),
      },
    )

    if (!columnIdList) {
      return <div>Loading...</div>
    }

    return (
      <div
        {...props}
        className={cn("flex flex-wrap gap-8 ", className)}
        ref={ref}
      >
        {columnIdList.map(columnId => (
          <Column
            columnId={columnId}
            key={columnId}
          />
        ))}
      </div>
    )
  },
)

ColumnList.displayName = "ColumnList"

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
