'use client';

type AddPlayerDetails = {
    playerId: number;
};

export default function AddPlayerDetails(props: AddPlayerDetails) {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold text-center">
                    Player Details
                </h1>
                <h2 className="text-sm text-gray-600 text-center">
                    We just need a few more details about this player to get
                    them added!
                </h2>
            </div>
            <div className="flex justify-center gap-2">
                <label className="text-base">Player number: </label>
                <input
                    type="number"
                    name="playerNumber"
                    className="border-b border-slate-500"
                ></input>
            </div>
            <input
                name="playerId"
                value={props.playerId}
                className="hidden"
                readOnly={true}
            ></input>
            <input name="playerNumber" type="number"></input>
        </>
    );
}
