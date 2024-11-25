"use client";

import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import * as XLSX from "xlsx";
import {fetchWithAuth} from "@/app/utils/api";

type UserData = {
    id_user: number;
    name: string;
    last_name: string;
    email: string;
    number: string;
    birth_date: string;
};

type TableData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
};

const ResponsiveTable: React.FC = () => {
    const [data, setData] = useState<TableData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users: UserData[] = await fetchWithAuth("/api/Users/getAllUsers");

                const formattedData = users.map(user => ({
                    col1: user.name,
                    col2: user.last_name,
                    col3: user.email,
                    col4: user.number,
                    col5: user.birth_date,
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const columns: Column<TableData>[] = React.useMemo(
        () => [
            { Header: "First Name", accessor: "col1" },
            { Header: "Last Name", accessor: "col2" },
            { Header: "Email", accessor: "col3" },
            { Header: "Phone Number", accessor: "col4" },
            { Header: "Birth Date", accessor: "col5" },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    const exportToExcel = () => {
        const headers = headerGroups[0].headers.map((col) => col.render("Header"));
        const excelData = rows.map((row) => {
            prepareRow(row);
            return row.cells.map((cell) => cell.value);
        });
        const finalData = [headers, ...excelData];

        const ws = XLSX.utils.aoa_to_sheet(finalData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "TableData");
        XLSX.writeFile(wb, "table_data.xlsx");
    };

    return (
        <div className="p-5">
            <button
                onClick={exportToExcel}
                className="mb-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Export to Excel
            </button>
            <div className="overflow-x-auto">
                <table
                    {...getTableProps()}
                    className="table-auto w-full text-sm border-collapse"
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    key={column.id}
                                    className="border border-gray-300 bg-gray-100 px-4 py-2 text-left"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                key={row.id}
                                className="hover:bg-gray-100"
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
                                        className="border border-gray-300 px-4 py-2 text-left"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResponsiveTable;
