import { Game } from '@/types/gameTypes';
import '@/extensions/stringExtensions';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';

type TeamGamesListProps = {
    teamId: string;
    games: Game[];
    isAdmin: boolean;
};

export default function TeamGamesList(props: TeamGamesListProps) {
    return (
        <>
            <div className="text-gray-900 flex flex-col p-2">
                {props.isAdmin && (
                    <div className="flex justify-center mb-4">
                        <Link
                            className="p-2 px-4 bg-emerald-400 rounded-xl w-3/6 flex justify-between items-center"
                            href={`/Teams/${props.teamId}/AddGame`}
                        >
                            Add Game <PlusIcon className="w-6 h-6" />
                        </Link>
                    </div>
                )}
                <div className="bg-teal-100 text-gray-900 py-3 px-7 rounded-xl ">
                    {props.games.map((game) => {
                        return (
                            <div className="flex flex-col gap-3" key={game.id}>
                                <div className="flex flex-row justify-between">
                                    <p className="text-l font-bold">
                                        {game.teamCreatedBy.name.toTitleCase()}
                                    </p>
                                    <p className="text-l font-bold">
                                        {game.goalsScored}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-l font-bold">
                                        {game.opponentTeam.toTitleCase()}
                                    </p>
                                    <p className="text-l font-bold">
                                        {game.goalsConceeded}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
