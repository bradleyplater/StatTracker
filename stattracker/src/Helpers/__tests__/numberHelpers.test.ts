import '@testing-library/jest-dom';
import { generateRandom6DigitNumber } from '../numberHelpers';

describe('numberHelpers', () => {
    describe('generateRandom6DigitNumber', () => {
        it('generates a random number exactly 6 digits long', () => {
            const randomNumber = generateRandom6DigitNumber();

            expect(randomNumber.toString().length).toBe(6);
        });
    });
});
