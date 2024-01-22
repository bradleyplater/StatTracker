import { Game } from '@/types/gameTypes';

type TeamGamesListProps = {
    games: Game[];
};

export default function TeamGamesList(props: TeamGamesListProps) {
    return (
        <>
            <div className="text-gray-900 flex flex-col p-2">
                <div className="bg-teal-100 text-gray-900 py-3 px-7 rounded-xl ">
                    {props.games.map((game) => {
                        return (
                            <div className="flex flex-col gap-3" key={game.id}>
                                <div className="flex flex-row justify-between">
                                    <p className="text-l font-bold">
                                        {game.teamCreatedBy.name}
                                    </p>
                                    <p className="text-l font-bold">
                                        {game.goalsScored}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-l font-bold">
                                        {game.opponentTeam}
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
