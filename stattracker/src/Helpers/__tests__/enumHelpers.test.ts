import '@testing-library/jest-dom';
import { generateRandom6DigitNumber } from '../numberHelpers';
import { getNumericEnumKeys } from '../enumHelpers';
import { ShootingSide } from '@/enums/ShootingSide';

describe('enumHelpers', () => {
    describe('getNumericEnumKeys', () => {
        it('Passing enum will return its keys as an array', () => {
            const expected = ['Not Specified', 'Left', 'Right'];

            const result = getNumericEnumKeys(ShootingSide);

            expect(result).toEqual(expected);
        });
    });
});
