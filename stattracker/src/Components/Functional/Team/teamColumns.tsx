import { Button } from '@/Components/ui/button';
import { Player, PlayerStats, PlayerTeamStats } from '@/types/playerTypes';
import { ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { ColumnDef } from '@tanstack/react-table';

export const teamPlayerDataColumns: ColumnDef<PlayerTeamStats>[] = [
    // {
    //     id: 'index',
    //     accessorFn: (_row: any, i: number) => i + 1,
    // },
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
                        column.toggleSorting(column.getIsSorted() === 'asc')
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
        accessorKey: 'totalPoints',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Total Points
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
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Pims
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'totalPoints',
        sortingFn: (rowA, rowB) => {
            // Check if both players have played more than 4 games
            if (
                rowA.original.gamesPlayed >= 4 &&
                rowB.original.gamesPlayed >= 4
            ) {
                // Compare based on points per game average
                if (
                    rowA.original.totalPoints / rowA.original.gamesPlayed >
                    rowB.original.totalPoints / rowB.original.gamesPlayed
                ) {
                    return -1; // rowA comes first
                } else if (
                    rowA.original.totalPoints / rowA.original.gamesPlayed <
                    rowB.original.totalPoints / rowB.original.gamesPlayed
                ) {
                    return 1; // rowB comes first
                } else {
                    return 0; // No change in order
                }
            } else if (rowA.original.gamesPlayed > 4) {
                // rowA has played more than 4 games, prioritize it
                return -1;
            } else if (rowB.original.gamesPlayed > 4) {
                // rowB has played more than 4 games, prioritize it
                return 1;
            } else {
                // Neither player has played more than 4 games, maintain current order
                return 0;
            }
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Points Per Game
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const ppg = (
                row.original.totalPoints / row.original.gamesPlayed
            ).toFixed(2);

            return <div>{ppg}</div>;
        },
    },
];
