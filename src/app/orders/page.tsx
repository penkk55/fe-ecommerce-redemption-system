"use client"

import React, { useState, useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define the DataTable component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// Page component that fetches the data and passes it to DataTable
const Page = () => {
  const [data, setData] = useState<any[]>([]) // Store fetched data
  const [loading, setLoading] = useState<boolean>(true) // Track loading state
  const [error, setError] = useState<string | null>(null) // Handle errors

  // Columns definition
  const columns: ColumnDef<any, any>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'customerId',
      accessorKey: 'customerId',
    },
    {
      header: 'total',
      accessorKey: 'total',
    },
    {
        header: 'status',
        accessorKey: 'status',
      },
    
  ]

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/orders")
        // const response = await fetch("api/products?offset=3&limit=3")
        const result = await response.json()
        
        if (response.ok) {
          setData(result) // Set the fetched data
        } else {
          setError("Failed to fetch data")
        }
      } catch (err) {
        setError("An error occurred while fetching data " +err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  // Render DataTable with fetched data
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Page
