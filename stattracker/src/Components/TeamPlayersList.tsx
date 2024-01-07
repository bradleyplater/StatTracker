import { Player } from '@/types/playerTypes';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

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
                    <table className="table-auto bg-teal-100 rounded-xl ">
                        <thead>
                            <tr className="">
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    #
                                </th>
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    Name
                                </th>
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    Games Played
                                </th>
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    Goals
                                </th>
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    Assists
                                </th>
                                <th className="p-3 sm:p-5 border-b border-slate-500">
                                    Pims
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.players.map((player) => {
                                return (
                                    <tr key={player.id}>
                                        <td className="p-3 text-center">
                                            {player.number}
                                        </td>
                                        <td className="p-3 text-center">
                                            {player.firstName} {player.surname}
                                        </td>
                                        <td className="p-3 text-center">
                                            {player.gamesPlayed}
                                        </td>
                                        <td className="p-3 text-center">
                                            {player.goals}
                                        </td>
                                        <td className="p-3 text-center">
                                            {player.assists}
                                        </td>
                                        <td className="p-3 text-center">
                                            {player.pims}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
