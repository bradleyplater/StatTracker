import { Player } from '@/types/playerTypes';

export function createPlayerOptions(
    players: Player[]
): { value: string; label: string }[] {
    let playerOptions: { value: string; label: string }[] = [];
    players.map((player) => {
        playerOptions.push({
            value: player.id,
            label: `${player.firstName.toTitleCase()} ${player.surname.toTitleCase()}`,
        });
    });
    return playerOptions;
}
