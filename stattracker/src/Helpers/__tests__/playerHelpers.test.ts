import '@testing-library/jest-dom';
import '@/extensions/stringExtensions';
import { Player } from '@/types/playerTypes';
import { createPlayerOptions } from '../playerHelpers';

describe('playerHelpers', () => {
    describe('createPlayerOptions', () => {
        const player = {
            id: 'PLR422322',
            firstName: 'John',
            surname: 'Doe',
        } as Player;
        it('Generates an option based on player data', () => {
            const expected = [
                {
                    value: 'PLR422322',
                    label: 'John Doe',
                },
            ];

            const actual = createPlayerOptions([player]);

            expect(actual).toEqual(expected);
        });

        it('Generates an array with multiple items if more than one player is passed', () => {
            const player2 = {
                id: 'PLR422333',
                firstName: 'John',
                surname: 'Smith',
            } as Player;

            const actual = createPlayerOptions([player, player2]);

            expect(actual.length).toBeGreaterThan(1);
        });

        it('Correctly formats the label to be title case', () => {
            player.firstName = 'john';
            player.surname = 'doe';
            const expected = [
                {
                    value: 'PLR422322',
                    label: 'John Doe',
                },
            ];

            const actual = createPlayerOptions([player]);

            expect(actual).toEqual(expected);
        });
    });
});
