import { Player } from '@/types/playerTypes';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { DataTable } from './Functional/Team/data-table';
import { teamPlayerDataColumns } from './Functional/Team/teamColumns';

type TeamPlayersListProps = {
    players: Player[];
    teamId: string;
    isAdmin: boolean;
};

export default function TeamPlayersList(props: TeamPlayersListProps) {
    return (
        <>
            <div className="text-gray-900 flex flex-col">
                {props.isAdmin && (
                    <div className="flex justify-center mb-4">
                        <Link
                            className="p-2 px-4 bg-emerald-400 rounded-xl w-3/6 flex justify-between items-center"
                            href={`/Teams/${props.teamId}/AddPlayer`}
                        >
                            Add Player <PlusIcon className="w-6 h-6" />
                        </Link>
                    </div>
                )}
                <div className="overflow-x-auto flex justify-center">
                    <DataTable
                        columns={teamPlayerDataColumns}
                        data={props.players}
                    />
                </div>
            </div>
        </>
    );
}
