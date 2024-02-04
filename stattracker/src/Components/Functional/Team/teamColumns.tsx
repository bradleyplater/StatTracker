import { Button } from '@/Components/ui/button';
import { Player } from '@/types/playerTypes';
import { ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { ColumnDef } from '@tanstack/react-table';

export const teamPlayerDataColumns: ColumnDef<Player>[] = [
    {
        accessorKey: 'number',
        header: '#',
    },
    {
        accessorKey: 'firstName',
        header: 'Name',
        cell: ({ row }) => {
            const fullName = `${row.original.firstName} ${row.original.surname}`;

            return <div>{fullName}</div>;
        },
    },
    {
        accessorKey: 'gamesPlayed',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'desc')
                    }
                >
                    Games Played
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'goals',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Goals
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'assists',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Assists
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'pims',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'desc')
                    }
                >
                    Pims
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
];