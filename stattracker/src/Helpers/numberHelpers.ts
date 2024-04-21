export function generateRandom6DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Format the number to have leading zeros and ensure it's 6 digits long
    const formattedNumber = String(randomNumber).padStart(6, '0');

    return formattedNumber;
}

export function formatDurationFromSeconds(durationInSeconds: number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
}
