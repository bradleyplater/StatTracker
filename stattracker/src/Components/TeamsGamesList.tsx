import { Game } from '@/types/gameTypes';
import '@/extensions/stringExtensions';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';

type TeamGamesListProps = {
    teamId: string;
    games: Game[];
    isAdmin: boolean;
};

function getBackgroundColour(game: Game) {
    if (game.goalsScored > game.goalsConceeded) {
        return 'bg-green-200';
    } else if (game.goalsScored < game.goalsConceeded) {
        return 'bg-red-200';
    } else {
        return 'bg-amber-200';
    }
}

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
                <div className=" text-gray-900 py-3 px-7 ">
                    {props.games.map((game) => {
                        return (
                            <Link
                                className={`${getBackgroundColour(
                                    game
                                )} flex flex-col gap-3 mb-2 py-3 px-7 rounded-xl hover:outline hover:outline-1 hover:outline-slate-500`}
                                key={game.id}
                                href={`/Games/${game.id}`}
                            >
                                <div className="flex flex-row justify-center">
                                    <p className="text-l font-bold">
                                        {game.date.toDateString()} -{' '}
                                        {game.isHome ? 'Home' : 'Away'}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-l ">
                                        {game.teamCreatedBy.name.toTitleCase()}
                                    </p>
                                    <p className="text-l">{game.goalsScored}</p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-l">
                                        {game.opponentTeam.toTitleCase()}
                                    </p>
                                    <p className="text-l">
                                        {game.goalsConceeded}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
